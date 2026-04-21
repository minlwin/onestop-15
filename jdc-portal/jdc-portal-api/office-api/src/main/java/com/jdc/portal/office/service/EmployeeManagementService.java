package com.jdc.portal.office.service;

import static com.jdc.portal.commons.utils.NullSafetyUtils.safeCall;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Function;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jdc.portal.commons.JdcBusinessException;
import com.jdc.portal.commons.dto.ActivationEvent;
import com.jdc.portal.commons.dto.DataModificationResult;
import com.jdc.portal.commons.utils.ActivationCodeGenerator;
import com.jdc.portal.domains.account.Employee;
import com.jdc.portal.domains.account.EmployeeActivation;
import com.jdc.portal.domains.account.Employee_;
import com.jdc.portal.domains.account.repo.AccountRepo;
import com.jdc.portal.domains.account.repo.EmployeeActivationRepo;
import com.jdc.portal.domains.account.repo.EmployeeRepo;
import com.jdc.portal.domains.utils.consts.Role;
import com.jdc.portal.office.input.EmployeeForm;
import com.jdc.portal.office.input.EmployeeSearch;
import com.jdc.portal.office.output.EmployeeDetails;
import com.jdc.portal.office.output.EmployeeItem;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.JoinType;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class EmployeeManagementService {
	
	private final EmployeeRepo employeeRepo;
	private final EmployeeActivationRepo activationRepo;
	private final AccountRepo accountRepo;
	private final ApplicationEventPublisher publisher;

	public List<EmployeeItem> search(EmployeeSearch search) {
		
		Function<CriteriaBuilder, CriteriaQuery<EmployeeItem>> queryFunc = cb -> {
			var cq = cb.createQuery(EmployeeItem.class);
			var root = cq.from(Employee.class);
			
			var account = root.join(Employee_.account, JoinType.LEFT);
			var activation = root.join(Employee_.activation, JoinType.LEFT);
			
			cq.where(search.where(cb, root, account, activation));
			EmployeeItem.select(cb, cq, root, account, activation);
			return cq;
		};
		
		return employeeRepo.search(queryFunc);
	}

	public EmployeeDetails findById(int id) {
		return safeCall(employeeRepo.findById(id).map(EmployeeDetails::from), "Employee", "id %s".formatted(id));
	}

	@Transactional
	public DataModificationResult<Integer> create(EmployeeForm form) {
		
		var employee = employeeRepo.save(form.toEntity());
		
		employeeRepo.save(employee);

		if(form.wasAStudent()) {
			var account = safeCall(accountRepo.findOneByEmail(form.email()), "Account", "email %s".formatted(form.email()));
			employee.setAccount(account);
			employee.setActivatedAt(employee.getEntryAt().atStartOfDay());
			var roles = new ArrayList<>(account.getRoles());
			roles.add(Role.Office);
			account.setRoles(roles);
		} else {
			
			if(accountRepo.countByEmail(form.email()) > 0 || activationRepo.countByEmail(form.email()) > 0) {
				throw new JdcBusinessException("%s is already use in other account.".formatted(form.email()));
			}
			
			var activation = new EmployeeActivation();
			activation.setAccount(employee);
			activation.setEmail(form.email());
			activation.setName(form.name());
			activation.setCode(ActivationCodeGenerator.generateCode());
			activationRepo.save(activation);
			publisher.publishEvent(new ActivationEvent(employee.getId(), form.name(), Role.Office, form.email()));
		}
		
		return new DataModificationResult<>(employee.getId());
	}

	@Transactional
	public DataModificationResult<Integer> update(int id, EmployeeForm form) {
		
		var employee = safeCall(employeeRepo.findById(id), "Employee", "id %s".formatted(id));
		
		if(null == employee.getActivatedAt()) {
			throw new JdcBusinessException("Employee need to activate.");
		}
		
		var account = employee.getAccount();
		if(!account.getEmail().equals(form.email())) {
			if(accountRepo.countByEmail(form.email()) > 1) {
				throw new JdcBusinessException("%s is already use in other account.".formatted(form.email()));
			}
			
			account.setEmail(form.email());
		}
		
		account.setName(form.name());
		
		employee.setPosition(form.position());
		employee.setPhone(form.phone());
		employee.setEntryAt(form.entryAt());

		return new DataModificationResult<>(employee.getId());
	}
}

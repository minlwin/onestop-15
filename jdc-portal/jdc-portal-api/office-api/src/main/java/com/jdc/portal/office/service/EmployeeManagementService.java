package com.jdc.portal.office.service;

import static com.jdc.portal.utils.NullSafetyUtils.safeCall;

import java.util.List;
import java.util.function.Function;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jdc.portal.domains.account.Employee;
import com.jdc.portal.domains.account.repo.EmployeeRepo;
import com.jdc.portal.dto.DataModificationResult;
import com.jdc.portal.office.input.EmployeeForm;
import com.jdc.portal.office.input.EmployeeSearch;
import com.jdc.portal.office.output.EmployeeDetails;
import com.jdc.portal.office.output.EmployeeItem;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class EmployeeManagementService {
	
	private final EmployeeRepo employeeRepo;

	public List<EmployeeItem> search(EmployeeSearch search) {
		
		Function<CriteriaBuilder, CriteriaQuery<EmployeeItem>> queryFunc = cb -> {
			var cq = cb.createQuery(EmployeeItem.class);
			var root = cq.from(Employee.class);
			cq.where(search.where(cb, root));
			EmployeeItem.select(cb, cq, root);
			return cq;
		};
		
		return employeeRepo.search(queryFunc);
	}

	public EmployeeDetails findById(int id) {
		return safeCall(employeeRepo.findById(id).map(EmployeeDetails::from), "Employee", "id %s".formatted(id));
	}

	@Transactional
	public DataModificationResult<Integer> create(EmployeeForm form) {
		// TODO Auto-generated method stub
		return null;
	}

	@Transactional
	public DataModificationResult<Integer> update(int id, EmployeeForm form) {
		// TODO Auto-generated method stub
		return null;
	}
}

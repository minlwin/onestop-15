package com.jdc.portal.anonymous.service;

import static com.jdc.portal.commons.utils.NullSafetyUtils.safeCall;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jdc.portal.anonymous.input.ActivationForm;
import com.jdc.portal.commons.JdcBusinessException;
import com.jdc.portal.commons.dto.MessageResult;
import com.jdc.portal.domains.account.Account;
import com.jdc.portal.domains.account.repo.AccountRepo;
import com.jdc.portal.domains.account.repo.EmployeeActivationRepo;
import com.jdc.portal.domains.utils.consts.Role;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmployeeActivationService {
	
	private final EmployeeActivationRepo activationRepo;
	private final AccountRepo accountRepo;
	private final PasswordEncoder passwordEncoder;

	@Transactional
	public MessageResult activate(ActivationForm form) {
		// Find Employee Activation Information
		var activation = safeCall(activationRepo.findOneByEmail(form.email()), 
				"Activation Info", "email : %s".formatted(form.email()));
		
		// Check Activation Code
		if(!form.code().equals(activation.getCode())) {
			throw new JdcBusinessException("Invalid Activation Code");
		}
		
		// Create Account
		var account = new Account();
		account.setEmail(activation.getEmail());
		account.setRoles(List.of(Role.Office));
		account.setPassword(passwordEncoder.encode(form.password()));
		account.setName(activation.getName());
		account = accountRepo.save(account);
		
		// Update Employee Information
		var employee = activation.getAccount();
		employee.setAccount(account);
		employee.setActivation(null);
		
		// Delete Activation Information
		activationRepo.delete(activation);
		
		return new MessageResult("Your account is activated. Login again.");
	}

}

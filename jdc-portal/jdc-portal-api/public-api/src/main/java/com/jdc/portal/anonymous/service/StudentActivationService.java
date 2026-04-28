package com.jdc.portal.anonymous.service;

import static com.jdc.portal.commons.utils.NullSafetyUtils.safeCall;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jdc.portal.anonymous.input.ActivationForm;
import com.jdc.portal.commons.JdcBusinessException;
import com.jdc.portal.commons.dto.MessageResult;
import com.jdc.portal.domains.account.Account;
import com.jdc.portal.domains.account.repo.AccountRepo;
import com.jdc.portal.domains.account.repo.StudentActivationRepo;
import com.jdc.portal.domains.utils.consts.Role;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StudentActivationService {
	
	private final StudentActivationRepo activationRepo;
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
		account.setRoles(List.of(Role.Student));
		account.setPassword(passwordEncoder.encode(form.password()));
		account.setName(activation.getName());
		account = accountRepo.save(account);
		
		// Update Employee Information
		var student = activation.getAccount();
		student.setAccount(account);
		student.setActivation(null);
		student.setActivatedAt(LocalDateTime.now());
		
		// Delete Activation Information
		activationRepo.delete(activation);
		
		return new MessageResult("Your account is activated. Login again.");
	}

}

package com.jdc.portal.security;

import java.util.List;

import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.jdc.portal.domains.account.Account;
import com.jdc.portal.domains.account.repo.AccountRepo;
import com.jdc.portal.domains.utils.consts.Role;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class AdminUserInitializer {
	
	private final AccountRepo accountRepo;
	private final PasswordEncoder passwordEncoder;
	
	@Transactional
	@EventListener(classes = ContextRefreshedEvent.class)
	public void initAdmin() {
		if(accountRepo.count() == 0) {
			var admin = new Account();
			admin.setRoles(List.of(Role.Admin));
			admin.setName("Admin User");
			admin.setEmail("admin@jdc.com");
			admin.setPassword(passwordEncoder.encode("admin"));
			
			accountRepo.save(admin);
		}
	}
}

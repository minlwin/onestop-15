package com.jdc.portal.security;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.jdc.portal.domains.account.repo.AccountRepo;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class AppUserDetailsService implements UserDetailsService {

	private final AccountRepo accountRepo;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		var account = accountRepo.findOneByEmail(username)
				.orElseThrow(() -> new UsernameNotFoundException(username));
		
		return User.withUsername(username)
				.password(account.getPassword())
				.authorities(account.getRoles().stream().map(a -> new SimpleGrantedAuthority(a.name())).toList())
				.build();
	}

}

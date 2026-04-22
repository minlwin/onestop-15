package com.jdc.portal.security;

import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class JdcAuthenticationProvider extends DaoAuthenticationProvider{

	public JdcAuthenticationProvider(
			AppUserDetailsService userDetailsService,
			PasswordEncoder passwordEncoder) {
		super(userDetailsService);
		setPasswordEncoder(passwordEncoder);
		setHideUserNotFoundExceptions(false);
	}

}

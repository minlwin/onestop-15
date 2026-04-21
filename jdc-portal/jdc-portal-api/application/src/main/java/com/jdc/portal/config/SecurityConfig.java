package com.jdc.portal.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.ExceptionTranslationFilter;

import com.jdc.portal.domains.utils.consts.Role;
import com.jdc.portal.security.JwtTokenFilter;

@Configuration
public class SecurityConfig {

	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) {
		
		http.csrf(csrf -> csrf.disable());
		http.cors(_ -> {});
		
		http.authorizeHttpRequests(req -> {
			req.requestMatchers("/anonymous/**").permitAll();
			req.requestMatchers("/office/**").hasAnyAuthority(Role.Office.name(), Role.Admin.name());
			req.requestMatchers("/student/**").hasAuthority(Role.Student.name());
			req.anyRequest().denyAll();
		});
		
		http.addFilterAfter(jwtTokenFilter(), ExceptionTranslationFilter.class);
		http.sessionManagement(session -> {
			session.sessionCreationPolicy(SessionCreationPolicy.STATELESS);
		});
		
		return http.build();
	}
	
	@Bean
	JwtTokenFilter jwtTokenFilter() {
		return new JwtTokenFilter();
	}
		
	@Bean
	AuthenticationManager authenticationManager(AuthenticationConfiguration config) {
		return config.getAuthenticationManager();
	}
}

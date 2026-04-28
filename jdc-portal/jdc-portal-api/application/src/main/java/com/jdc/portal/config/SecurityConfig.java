package com.jdc.portal.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.ExceptionTranslationFilter;

import com.jdc.portal.domains.utils.consts.Role;
import com.jdc.portal.handler.SecurityExceptionsHandler;
import com.jdc.portal.security.JwtTokenFilter;

@Configuration
public class SecurityConfig {

	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) {
		
		http.csrf(csrf -> csrf.disable());
		http.cors(_ -> {});
		
		http.authorizeHttpRequests(req -> {
			req.requestMatchers("/anonymous/**", "/storage/**").permitAll();
			req.requestMatchers("/office/**").hasAnyAuthority(Role.Office.name(), Role.Admin.name());
			req.requestMatchers("/student/**").hasAuthority(Role.Student.name());
			
		});
		
		http.addFilterAfter(jwtTokenFilter(), ExceptionTranslationFilter.class);
		http.sessionManagement(session -> {
			session.sessionCreationPolicy(SessionCreationPolicy.STATELESS);
		});
		
		http.exceptionHandling(exception -> {
			exception.authenticationEntryPoint(securityExceptionsHandler());
			exception.accessDeniedHandler(securityExceptionsHandler());
		});
		
		return http.build();
	}
	
	@Bean
	JwtTokenFilter jwtTokenFilter() {
		return new JwtTokenFilter();
	}
	
	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
		
	@Bean
	AuthenticationManager authenticationManager(AuthenticationConfiguration config) {
		return config.getAuthenticationManager();
	}
	
	@Bean
	SecurityExceptionsHandler securityExceptionsHandler() {
		return new SecurityExceptionsHandler();
	}
}

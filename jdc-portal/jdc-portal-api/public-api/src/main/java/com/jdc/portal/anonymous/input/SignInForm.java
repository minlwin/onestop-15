package com.jdc.portal.anonymous.input;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record SignInForm(
		@NotBlank(message = "Please enter email address.")
		@Email(message = "Please enter a valid email address")
		String email,
		@NotBlank(message = "Please enter your password")
		String password) {

	public Authentication authentication() {
		return UsernamePasswordAuthenticationToken.unauthenticated(email, password);
	}

}

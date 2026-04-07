package com.jdc.portal.anonymous.input;

import jakarta.validation.constraints.NotBlank;

public record ActivationForm(
		@NotBlank(message = "Please enter the activation code")
		String code,
		@NotBlank(message = "Please enter your password")
		String password) {

}

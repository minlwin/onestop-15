package com.jdc.portal.anonymous.input;

import jakarta.validation.constraints.NotBlank;

public record TokenForm(
		@NotBlank(message = "Refresh token is required.")
		String token) {

}

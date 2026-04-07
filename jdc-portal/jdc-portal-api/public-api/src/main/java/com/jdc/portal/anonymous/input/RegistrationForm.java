package com.jdc.portal.anonymous.input;

import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record RegistrationForm(
		@NotNull(message = "Please select a class")
		Integer classId,
		@NotEmpty(message = "Please enter your name")
		String name,
		@NotBlank(message = "Please enter email address.")
		@Email(message = "Please enter a valid email address")
		String email,
		@NotEmpty(message = "Please enter your phone number")
		String phone,
		@NotEmpty(message = "Please select a payment account")
		String payment,
		@NotNull(message = "Please select payment slip image.")
		MultipartFile paymentSlip) {

}

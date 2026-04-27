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
		@NotNull(message = "Please select a payment account")
		Integer payment,
		@NotNull(message = "Please enter paid amount")
		Integer amount,
		@NotNull(message = "Please select payment slip image.")
		MultipartFile paymentSlip) {

}

package com.jdc.portal.office.input;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

public record RegistrationForm(
		@NotNull(message = "Please select a class")
		Integer classId,
		@NotBlank(message = "Please enter student name")
		String name,
		@NotBlank(message = "Please enter student phone number")
		String phone,
		@NotBlank(message = "Please enter a valid email address")
		String email,
		@NotNull(message = "Please enter a valid number")
	    @PositiveOrZero(message = "Please enter a valid number")
		Integer registrationFee) {

}

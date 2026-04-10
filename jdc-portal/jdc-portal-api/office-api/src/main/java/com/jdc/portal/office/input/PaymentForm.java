package com.jdc.portal.office.input;

import jakarta.validation.constraints.NotNull;

public record PaymentForm(
		@NotNull(message = "Please select a class")
		Integer classId,
		@NotNull(message = "Please select a student")
		Integer studentId,
		@NotNull(message = "Please enter payment amount")
		Integer amount) {

}

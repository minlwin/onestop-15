package com.jdc.portal.office.input;

import com.jdc.portal.utils.consts.RegistrationStatus;

import jakarta.validation.constraints.NotNull;

public record RegistrationStatusForm(
		@NotNull(message = "Please select registration status")
		RegistrationStatus status,
		String rejectReason) {

}

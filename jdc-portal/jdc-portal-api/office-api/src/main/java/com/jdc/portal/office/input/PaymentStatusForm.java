package com.jdc.portal.office.input;

import com.jdc.portal.dto.consts.PaymentStatus;

import jakarta.validation.constraints.NotNull;

public record PaymentStatusForm(
		@NotNull(message = "Please select payment status")
		PaymentStatus status,
		String rejectReason) {

}

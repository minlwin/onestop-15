package com.jdc.portal.student.input;

import org.springframework.web.multipart.MultipartFile;

import com.jdc.portal.dto.consts.FeeType;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record PaymentForm(
		@NotNull(message = "Please select a class")
		Integer classId,
		@NotNull(message = "Please select a fee type")
		FeeType feeType,
		@NotNull(message = "Please enter a valid amount")
		Integer amount,
		@NotEmpty(message = "Please select a payment type")
		String payment,
		@NotNull(message = "Please upload a valid image file")
		MultipartFile paymentSlip) {

}

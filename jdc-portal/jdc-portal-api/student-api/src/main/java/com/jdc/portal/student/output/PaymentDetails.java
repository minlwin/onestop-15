package com.jdc.portal.student.output;

import java.time.LocalDate;

import com.jdc.portal.dto.consts.FeeType;
import com.jdc.portal.dto.consts.PaymentStatus;
import com.jdc.portal.dto.consts.PaymentType;

public record PaymentDetails(
		long id,
		int classId,
		String className,
		LocalDate paymentDate,
		int amount,
		PaymentType paymentType, 
		PaymentStatus status,
		FeeType particular,
		String slip) {

}

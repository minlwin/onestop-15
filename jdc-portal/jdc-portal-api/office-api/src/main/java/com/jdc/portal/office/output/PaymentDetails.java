package com.jdc.portal.office.output;

import java.time.LocalDate;

import com.jdc.portal.dto.consts.ClassType;
import com.jdc.portal.dto.consts.FeeType;
import com.jdc.portal.dto.consts.PaymentStatus;
import com.jdc.portal.dto.consts.PaymentType;

public record PaymentDetails(
		long id,
		String course,
		LocalDate startDate,
		ClassType classType,
		String studentName,
		String email,
		String phone,
		LocalDate paymentDate,
		PaymentType paymentType,
		int amount,
		PaymentStatus status,
		FeeType particular,
		String rejectReason,
		String paySlip
) {

}

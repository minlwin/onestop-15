package com.jdc.portal.student.output;

import java.time.LocalDateTime;

import com.jdc.portal.domains.transaction.Payment;
import com.jdc.portal.domains.utils.consts.FeeType;
import com.jdc.portal.domains.utils.consts.PaymentStatus;
import com.jdc.portal.domains.utils.consts.PaymentType;

public record PaymentDetails(
		long id,
		int classId,
		String className,
		LocalDateTime paymentDate,
		int amount,
		PaymentType paymentType, 
		PaymentStatus status,
		FeeType particular,
		String slip) {

	public static PaymentDetails from(Payment entity) {
		
		var classes = entity.getRegistration().getClasses();
		var className = "%s (%s) - %s".formatted(
				classes.getCourse().getName(),
				classes.getType(),
				classes.getStartDate().toString()
		);
		
		return new PaymentDetails(
			entity.getId(),
			entity.getRegistration().getClasses().getId(),
			className,
			entity.getPayAt(),
			entity.getAmount(),
			entity.getType(),
			entity.getStatus(),
			entity.getFeeType(),
			entity.getSlip()
		);
	}
	
}

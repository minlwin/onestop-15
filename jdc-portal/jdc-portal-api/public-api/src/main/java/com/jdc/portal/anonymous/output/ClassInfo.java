package com.jdc.portal.anonymous.output;

import java.time.LocalDate;

import com.jdc.portal.domains.master.Classes;
import com.jdc.portal.utils.consts.ClassType;

public record ClassInfo(
		int id,
		ClassType type,
		LocalDate startDate,
		String days,
		String times,
		int months,
		int registrationFee,
		int monthlyFee) {

	public ClassInfo(Classes entity) {
		this(
			entity.getId(),
			entity.getType(),
			entity.getStartDate(),
			String.join(", ", entity.getDays()),
			"%s - %s".formatted(entity.getTimeFrom(), entity.getTimeTo()),
			entity.getMonths(),
			entity.getRegistrationFee(),
			entity.getMonthlyFee()
		);
	}
}

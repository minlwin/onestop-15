package com.jdc.portal.anonymous.output;

import java.time.LocalDate;

import com.jdc.portal.dto.consts.ClassType;

public record ClassDetails(
		int id,
		ClassType type,
		LocalDate startDate,
		String days,
		String times,
		int months,
		int registrationFee,
		int monthlyFee,
		CourseItem course) {

}

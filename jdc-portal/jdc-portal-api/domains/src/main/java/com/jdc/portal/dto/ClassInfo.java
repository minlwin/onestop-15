package com.jdc.portal.dto;

import java.time.LocalDate;

import com.jdc.portal.dto.consts.ClassType;

public record ClassInfo(
		int id,
		ClassType type,
		LocalDate startDate,
		String days,
		String times,
		int months,
		int registrationFee,
		int monthlyFee) {

}

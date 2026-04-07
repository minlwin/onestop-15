package com.jdc.portal.student.output;

import java.time.LocalDate;

import com.jdc.portal.dto.consts.ClassType;

public record ClassItem(
		int id,
		ClassType type,
		String course,
		LocalDate startDate,
		String description) {

}

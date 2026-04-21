package com.jdc.portal.anonymous.output;

import java.time.LocalDate;

import com.jdc.portal.commons.dto.CourseItem;
import com.jdc.portal.domains.master.Classes;
import com.jdc.portal.domains.utils.consts.ClassType;

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

	public ClassDetails(Classes entity) {
		this(
			entity.getId(),
			entity.getType(),
			entity.getStartDate(),
			String.join(", ", entity.getDays()),
			"%s - %s".formatted(entity.getTimeFrom(), entity.getTimeTo()),
			entity.getMonths(),
			entity.getRegistrationFee(),
			entity.getMonthlyFee(),
			new CourseItem(
				entity.getCourse().getId(), 
				entity.getCourse().getName(),
				entity.getCourse().getLevel(),
				entity.getCourse().getDescription(),
				entity.getCourse().getHours()
			)
		);
	}
}

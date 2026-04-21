package com.jdc.portal.commons.dto;

import com.jdc.portal.domains.master.Course;
import com.jdc.portal.domains.utils.consts.CourseLevel;

public record CourseItem(
		int id,
		String name,
		CourseLevel level,
		String description,
		int hours) {

	public CourseItem(Course entity) {
		this(entity.getId(), entity.getName(), entity.getLevel(), entity.getDescription(), entity.getHours());
	}

}

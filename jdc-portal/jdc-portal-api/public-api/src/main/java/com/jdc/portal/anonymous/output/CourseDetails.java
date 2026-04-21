package com.jdc.portal.anonymous.output;

import java.util.List;

import com.jdc.portal.domains.master.Course;
import com.jdc.portal.utils.consts.CourseLevel;
import com.jdc.portal.utils.dto.CourseContent;

public record CourseDetails(		
		int id,
		String name,
		CourseLevel level,
		String description,
		int hours,
		List<CourseContent> contents) {

	public CourseDetails(Course entity) {
		this(
			entity.getId(),
			entity.getName(),
			entity.getLevel(),
			entity.getDescription(),
			entity.getHours(),
			entity.getContents()
		);
	}
}

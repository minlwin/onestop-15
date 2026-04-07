package com.jdc.portal.dto;

import com.jdc.portal.dto.consts.CourseLevel;

public record CourseItem(
		int id,
		String name,
		CourseLevel level,
		String description,
		String image,
		int hours) {

}

package com.jdc.portal.anonymous.output;

import java.util.List;

import com.jdc.portal.dto.CourseContent;
import com.jdc.portal.dto.consts.CourseLevel;

public record CourseDetails(		
		int id,
		String name,
		CourseLevel level,
		String description,
		String image,
		int hours,
		List<CourseContent> contents,
		List<ClassInfo> classes) {

}

package com.jdc.portal.office.input;

import com.jdc.portal.utils.dto.CourseContent;

import jakarta.validation.constraints.NotBlank;

public record CourseContentInput(
		@NotBlank(message = "Please enter a content name")
		String name,
		@NotBlank(message = "Please enter a content description")
		String description) {

	public static CourseContentInput from(CourseContent content) {
		return new CourseContentInput(content.name(), content.description());
	}
}

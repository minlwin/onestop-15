package com.jdc.portal.office.input;

import jakarta.validation.constraints.NotBlank;

public record CourseContentInput(
		@NotBlank(message = "Please enter a content name")
		String name,
		@NotBlank(message = "Please enter a content description")
		String description) {

}

package com.jdc.portal.office.input;

import java.util.List;

import com.jdc.portal.dto.consts.CourseLevel;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record CourseForm(
		@NotBlank(message = "Please enter a course")
		String course,
		@NotNull(message = "Please select a course level")
		CourseLevel courseLevel,
		@NotNull(message = "Please enter a valid number")
		Integer hours,
		@NotBlank(message = "Please enter a course description")
		String description,
		@NotEmpty(message = "Please enter at least one content")
		List<@Valid CourseContentInput> contents
		) {

}

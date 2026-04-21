package com.jdc.portal.office.input;

import java.util.ArrayList;
import java.util.List;

import com.jdc.portal.domains.master.Course;
import com.jdc.portal.domains.utils.consts.CourseLevel;
import com.jdc.portal.domains.utils.dto.CourseContent;

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

	public static CourseForm from(Course entity) {
		return new CourseForm(
				entity.getName(),
				entity.getLevel(),
				entity.getHours(),
				entity.getDescription(),
				entity.getContents().stream().map(CourseContentInput::from).toList()
		);
	}

	public Course toEntity() {
		
		var entity = new Course();
		entity.setName(course);
		entity.setLevel(courseLevel);
		entity.setHours(hours);
		entity.setDescription(description);
		entity.setContents(toContents());
		return entity;
	}

	public void updateEntity(Course entity) {
		entity.setName(course);
		entity.setLevel(courseLevel);
		entity.setHours(hours);
		entity.setDescription(description);
		entity.setContents(toContents());
	}
	
	private List<CourseContent> toContents() {
		var list = new ArrayList<CourseContent>();
		for(var i = 0; i < contents.size(); i++) {
			var input = contents.get(i);
			var content = new CourseContent(i + 1, input.name(), input.description());
			list.add(content);
		}
		return list;
	}
}

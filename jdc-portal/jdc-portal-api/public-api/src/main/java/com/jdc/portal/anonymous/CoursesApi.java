package com.jdc.portal.anonymous;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jdc.portal.anonymous.output.CourseDetails;
import com.jdc.portal.anonymous.service.CourseInfoService;
import com.jdc.portal.dto.CourseItem;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController("publicCoursesApi")
@RequestMapping("/anonymous/courses")
public class CoursesApi {
	
	private final CourseInfoService service;

	@GetMapping
	List<CourseItem> getAll() {
		return service.findAll();
	}
	
	@GetMapping("{id}")
	CourseDetails findById(@PathVariable int id) {
		return service.findById(id);
	}
}

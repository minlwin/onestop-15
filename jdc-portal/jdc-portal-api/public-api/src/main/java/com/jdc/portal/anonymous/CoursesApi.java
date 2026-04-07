package com.jdc.portal.anonymous;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jdc.portal.anonymous.output.CourseDetails;
import com.jdc.portal.anonymous.output.CourseItem;

@RestController
@RequestMapping("/anonymous/courses")
public class CoursesApi {

	@GetMapping
	List<CourseItem> getAll() {
		return null;
	}
	
	@GetMapping("{id}")
	CourseDetails findById(@PathVariable int id) {
		return null;
	}
}

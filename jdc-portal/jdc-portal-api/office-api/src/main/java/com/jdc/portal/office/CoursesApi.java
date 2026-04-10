package com.jdc.portal.office;

import java.util.List;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jdc.portal.dto.CourseItem;
import com.jdc.portal.dto.DataModificationResult;
import com.jdc.portal.office.input.CourseForm;
import com.jdc.portal.office.input.CourseSearch;
import com.jdc.portal.office.output.CourseDetails;

@RestController
@RequestMapping("office/courses")
public class CoursesApi {

	@GetMapping
	List<CourseItem> search(CourseSearch search) {
		return null;
	}
	
	@PostMapping
	DataModificationResult<Integer> create(@Validated @RequestBody CourseForm form) {
		return null;
	}

	@PutMapping("{id}")
	DataModificationResult<Integer> update(@PathVariable int id, @Validated @RequestBody CourseForm form) {
		return null;
	}
	
	@GetMapping("{id}")
	CourseDetails findById(@PathVariable int id) {
		return null;
	}

	@GetMapping("{id}/form")
	CourseForm findForm(@PathVariable int id) {
		return null;
	}
}

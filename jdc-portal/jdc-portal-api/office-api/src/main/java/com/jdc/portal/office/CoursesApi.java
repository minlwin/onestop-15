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

import com.jdc.portal.commons.dto.CourseItem;
import com.jdc.portal.commons.dto.DataModificationResult;
import com.jdc.portal.office.input.CourseForm;
import com.jdc.portal.office.input.CourseSearch;
import com.jdc.portal.office.output.CourseDetails;
import com.jdc.portal.office.service.CourseManagementService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("office/courses")
public class CoursesApi {

	private final CourseManagementService service;
	
	@GetMapping
	List<CourseItem> search(CourseSearch search) {
		return service.search(search);
	}
	
	@PostMapping
	DataModificationResult<Integer> create(@Validated @RequestBody CourseForm form) {
		return service.create(form);
	}

	@PutMapping("{id}")
	DataModificationResult<Integer> update(@PathVariable int id, @Validated @RequestBody CourseForm form) {
		return service.update(id, form);
	}
	
	@GetMapping("{id}")
	CourseDetails findById(@PathVariable int id) {
		return service.findById(id);
	}

	@GetMapping("{id}/form")
	CourseForm findForm(@PathVariable int id) {
		return service.findForm(id);
	}
}

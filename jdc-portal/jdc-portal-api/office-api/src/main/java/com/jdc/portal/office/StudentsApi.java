package com.jdc.portal.office;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jdc.portal.domains.utils.dto.PageResult;
import com.jdc.portal.office.input.StudentSearch;
import com.jdc.portal.office.output.StudentDetails;
import com.jdc.portal.office.output.StudentItem;
import com.jdc.portal.office.service.StudentManagementService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("office/students")
public class StudentsApi {
	
	private final StudentManagementService service;

	@GetMapping
	PageResult<StudentItem> search(StudentSearch search, 
			@RequestParam(required = false, defaultValue = "0") int page, 
			@RequestParam(required = false, defaultValue = "10") int size) {
		return service.search(search, page, size);
	}
	
	@GetMapping("{id}")
	StudentDetails findById(@PathVariable int id) {
		return service.findById(id);
	}

}

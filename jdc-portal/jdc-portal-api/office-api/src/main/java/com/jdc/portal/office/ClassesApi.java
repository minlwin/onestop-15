package com.jdc.portal.office;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jdc.portal.commons.dto.DataModificationResult;
import com.jdc.portal.domains.utils.dto.PageResult;
import com.jdc.portal.office.input.ClassForm;
import com.jdc.portal.office.input.ClassSearch;
import com.jdc.portal.office.output.ClassDetails;
import com.jdc.portal.office.output.ClassForStudent;
import com.jdc.portal.office.output.ClassItem;
import com.jdc.portal.office.service.ClassesManagementService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("office/classes")
public class ClassesApi {
	
	private final ClassesManagementService service;

	@GetMapping
	PageResult<ClassItem> search(ClassSearch search, 
			@RequestParam(required = false, defaultValue = "0") int page, 
			@RequestParam(required = false, defaultValue = "10") int size) {
		return service.search(search, page, size);
	}
	
	@PostMapping
	DataModificationResult<Integer> create(@Validated @RequestBody ClassForm form) {
		return service.create(form);
	}
	
	@PutMapping("{id}")
	DataModificationResult<Integer> update(@PathVariable int id, @Validated @RequestBody ClassForm form) {
		return service.update(id, form);
	}
	
	@GetMapping("{id}")
	ClassDetails findById(@PathVariable int id) {
		return service.findById(id);
	}

	@GetMapping("{id}/form")
	ClassForm findForm(@PathVariable int id) {
		return service.findForm(id);
	}
	
	@GetMapping("{classId}/student/{studentId}")
	ClassForStudent findForStudent(@PathVariable int classId, @PathVariable int studentId) {
		return null;
	}
}

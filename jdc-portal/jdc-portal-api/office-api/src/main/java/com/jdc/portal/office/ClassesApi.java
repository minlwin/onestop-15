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

import com.jdc.portal.dto.DataModificationResult;
import com.jdc.portal.dto.PageResult;
import com.jdc.portal.office.input.ClassForm;
import com.jdc.portal.office.input.ClassSearch;
import com.jdc.portal.office.output.ClassDetails;
import com.jdc.portal.office.output.ClassForStudent;
import com.jdc.portal.office.output.ClassItem;

@RestController
@RequestMapping("office/classes")
public class ClassesApi {

	@GetMapping
	PageResult<ClassItem> search(ClassSearch search, 
			@RequestParam(required = false, defaultValue = "0") int page, 
			@RequestParam(required = false, defaultValue = "10") int size) {
		return null;
	}
	
	@PostMapping
	DataModificationResult<Integer> create(@Validated @RequestBody ClassForm form) {
		return null;
	}
	
	@PutMapping("{id}")
	DataModificationResult<Integer> update(@PathVariable int id, @Validated @RequestBody ClassForm form) {
		return null;
	}
	
	@GetMapping("{id}")
	ClassDetails findById(int id) {
		return null;
	}

	@GetMapping("{id}/form")
	ClassForm findForm(int id) {
		return null;
	}
	
	@GetMapping("{classId}/student/{studentId}")
	ClassForStudent findForStudent(int classId, int studentId) {
		return null;
	}
}

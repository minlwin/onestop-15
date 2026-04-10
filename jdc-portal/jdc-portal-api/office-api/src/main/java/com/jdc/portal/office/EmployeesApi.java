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

import com.jdc.portal.dto.DataModificationResult;
import com.jdc.portal.office.input.EmployeeForm;
import com.jdc.portal.office.input.EmployeeSearch;
import com.jdc.portal.office.output.EmployeeDetails;
import com.jdc.portal.office.output.EmployeeItem;

@RestController
@RequestMapping("office/employees")
public class EmployeesApi {

	@GetMapping
	List<EmployeeItem> search(EmployeeSearch search) {
		return null;
	}
	
	@PostMapping
	DataModificationResult<Integer> create(@Validated @RequestBody EmployeeForm form) {
		return null;
	}

	@PutMapping("{id}")
	DataModificationResult<Integer> update(@PathVariable int id, @Validated @RequestBody EmployeeForm form) {
		return null;
	}
	
	@GetMapping("{id}")
	EmployeeDetails findById(@PathVariable int id) {
		return null;
	}
}

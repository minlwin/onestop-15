package com.jdc.portal.office;

import java.util.List;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jdc.portal.commons.dto.DataModificationResult;
import com.jdc.portal.commons.dto.EmployeeActivationEvent;
import com.jdc.portal.office.input.EmployeeForm;
import com.jdc.portal.office.input.EmployeeSearch;
import com.jdc.portal.office.output.EmployeeDetails;
import com.jdc.portal.office.output.EmployeeItem;
import com.jdc.portal.office.service.EmployeeManagementService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("office/employees")
public class EmployeesApi {
	
	private final EmployeeManagementService service;
	private final ApplicationEventPublisher eventPublisher;

	@GetMapping
	List<EmployeeItem> search(EmployeeSearch search) {
		return service.search(search);
	}
	
	@PostMapping
	DataModificationResult<Integer> create(@Validated @RequestBody EmployeeForm form) {
		
		var result = service.create(form);
		
		if(result.getActivatedAt() == null) {
			eventPublisher.publishEvent(new EmployeeActivationEvent(result.getId()));
		}
		
		return new DataModificationResult<Integer>(result.getId());
	}

	@PutMapping("{id}")
	DataModificationResult<Integer> update(@PathVariable int id, @Validated @RequestBody EmployeeForm form) {
		return service.update(id, form);
	}
	
	@GetMapping("{id}")
	EmployeeDetails findById(@PathVariable int id) {
		return service.findById(id);
	}
}

package com.jdc.portal.office;

import java.util.List;

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
import com.jdc.portal.office.input.RegistrationForm;
import com.jdc.portal.office.input.RegistrationSearch;
import com.jdc.portal.office.input.RegistrationStatusForm;
import com.jdc.portal.office.output.RegistrationDetails;
import com.jdc.portal.office.output.RegistrationItem;
import com.jdc.portal.office.service.RegistrationManagementService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("office/registrations")
public class RegistrationsApi {
	
	private final RegistrationManagementService service;

	@GetMapping
	PageResult<RegistrationItem> search(RegistrationSearch search,
			@RequestParam(required = false, defaultValue = "0") int page, 
			@RequestParam(required = false, defaultValue = "10") int size) {
		
		return new PageResult<>(
			List.of(),
			page,
			size,
			0L
		);
	}
	
	@GetMapping("{id}")
	RegistrationDetails findById(@PathVariable long id) {
		return service.findById(id);
	}
	
	@PostMapping
	DataModificationResult<Long> create(@Validated @RequestBody RegistrationForm form) {
		return service.create(form);
	}
	
	@PutMapping("{id}")
	DataModificationResult<Long> update(@PathVariable long id, @Validated @RequestBody RegistrationStatusForm form) {
		return service.update(id, form);
	}
}

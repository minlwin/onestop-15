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
import com.jdc.portal.office.input.RegistrationForm;
import com.jdc.portal.office.input.RegistrationSearch;
import com.jdc.portal.office.input.RegistrationStatusForm;
import com.jdc.portal.office.output.RegistrationDetails;
import com.jdc.portal.office.output.RegistrationItem;

@RestController
@RequestMapping("office/registrations")
public class RegistrationsApi {

	@GetMapping
	PageResult<RegistrationItem> search(RegistrationSearch search,
			@RequestParam(required = false, defaultValue = "0") int page, 
			@RequestParam(required = false, defaultValue = "10") int size) {
		return null;
	}
	
	@GetMapping("{id}")
	RegistrationDetails findById(@PathVariable long id) {
		return null;
	}
	
	@PostMapping
	DataModificationResult<Long> create(@Validated @RequestBody RegistrationForm form) {
		return null;
	}
	
	@PutMapping("{id}")
	DataModificationResult<Long> update(@PathVariable long id, @Validated @RequestBody RegistrationStatusForm form) {
		return null;
	}
}

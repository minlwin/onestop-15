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

import com.jdc.portal.commons.dto.DataModificationResult;
import com.jdc.portal.office.input.PaymentAccountForm;
import com.jdc.portal.office.output.PaymentAccountDetails;
import com.jdc.portal.office.output.PaymentAccountItem;
import com.jdc.portal.office.service.PaymentAccountManagementService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("office/payment-account")
public class PaymentAccountApi {
	
	private final PaymentAccountManagementService service;

	@GetMapping
	List<PaymentAccountItem> getAll() {
		return service.getAll();
	}
	
	@GetMapping("{id}")
	PaymentAccountDetails findOne(@PathVariable int id) {
		return service.findById(id);
	}
	
	@PostMapping
	DataModificationResult<Integer> create(@Validated @RequestBody PaymentAccountForm form) {
		return service.create(form);
	}

	@PutMapping("{id}")
	DataModificationResult<Integer> update(@PathVariable int id,  @Validated @RequestBody PaymentAccountForm form) {
		return service.update(id, form);
	}

	@PutMapping("{id}/toggle")
	DataModificationResult<Integer> toggleStatus(@PathVariable int id) {
		return service.toggleStatus(id);
	}
}

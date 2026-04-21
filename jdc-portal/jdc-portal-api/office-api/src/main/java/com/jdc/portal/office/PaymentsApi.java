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
import com.jdc.portal.office.input.PaymentForm;
import com.jdc.portal.office.input.PaymentSearch;
import com.jdc.portal.office.input.PaymentStatusForm;
import com.jdc.portal.office.output.PaymentDetails;
import com.jdc.portal.office.output.PaymentItem;

@RestController
@RequestMapping("office/payments")
public class PaymentsApi {

	@GetMapping
	PageResult<PaymentItem> search(PaymentSearch search,
			@RequestParam(required = false, defaultValue = "0") int page, 
			@RequestParam(required = false, defaultValue = "10") int size) {
		return null;
	}
	
	@GetMapping("{id}")
	PaymentDetails findById(@PathVariable long id) {
		return null;
	}
	
	@PostMapping
	DataModificationResult<Long> create(@Validated @RequestBody PaymentForm form) {
		return null;
	}
	
	@PutMapping("{id}")
	DataModificationResult<Long> update(@PathVariable long id, @Validated @RequestBody PaymentStatusForm form) {
		return null;
	}
	
}

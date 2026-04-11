package com.jdc.portal.student;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jdc.portal.dto.DataModificationResult;
import com.jdc.portal.student.input.PaymentForm;
import com.jdc.portal.student.output.PaymentDetails;
import com.jdc.portal.student.output.PaymentItem;
import com.jdc.portal.student.service.StudentPaymentService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor	
@RestController("studentPaymentsApi")
@RequestMapping("/student/payments")
public class PaymentsApi {
	
	private final StudentPaymentService service;

	@GetMapping
	List<PaymentItem> search(@RequestParam(required = false) Integer classId, Authentication auth) {
		return service.search(classId, auth.getName());
	}
	
	@GetMapping("{id}")
	PaymentDetails findById(@PathVariable long id) {
		return service.findById(id);
	}

	@PostMapping
	DataModificationResult<Long> paid(@Validated PaymentForm form, Authentication auth) {
		return service.paid(form, auth.getName());
	}
	
}

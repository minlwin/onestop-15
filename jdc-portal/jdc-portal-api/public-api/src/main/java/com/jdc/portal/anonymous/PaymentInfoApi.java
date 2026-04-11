package com.jdc.portal.anonymous;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jdc.portal.anonymous.output.PaymentInfo;
import com.jdc.portal.anonymous.service.PaymentInfoService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/anonymous/payment-info")
public class PaymentInfoApi {
	
	private final PaymentInfoService service;

	@GetMapping
	List<PaymentInfo> index() {
		return service.getPaymentInfo();
	}
}

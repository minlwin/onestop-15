package com.jdc.portal.anonymous;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jdc.portal.anonymous.output.PaymentInfo;

@RestController
@RequestMapping("/anonymous/payment-info")
public class PaymentInfoApi {

	@GetMapping
	List<PaymentInfo> index() {
		return null;
	}
}

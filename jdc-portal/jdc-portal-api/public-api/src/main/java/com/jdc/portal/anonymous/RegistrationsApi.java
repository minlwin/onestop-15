package com.jdc.portal.anonymous;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jdc.portal.anonymous.input.CheckRegistrationForm;
import com.jdc.portal.anonymous.input.RegistrationForm;
import com.jdc.portal.anonymous.service.RegistrationService;
import com.jdc.portal.commons.dto.MessageResult;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController("publicRegistrationsApi")
@RequestMapping("/anonymous/registrations")
public class RegistrationsApi {
	
	private final RegistrationService service;

	@PostMapping("apply")
	MessageResult apply(@Validated RegistrationForm form) {
		return service.apply(form);
	}
	
	@PostMapping("check")
	MessageResult check(@Validated @RequestBody CheckRegistrationForm form) {
		return service.check(form);
	}
}

package com.jdc.portal.anonymous;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jdc.portal.anonymous.input.CheckRegistrationForm;
import com.jdc.portal.anonymous.input.RegistrationForm;
import com.jdc.portal.dto.MessageResult;

@RestController("publicRegistrationsApi")
@RequestMapping("/anonymous/registrations")
public class RegistrationsApi {

	@PostMapping("apply")
	MessageResult apply(@Validated RegistrationForm form) {
		return null;
	}
	
	@PostMapping("check")
	MessageResult check(@Validated @RequestBody CheckRegistrationForm form) {
		return null;
	}
}

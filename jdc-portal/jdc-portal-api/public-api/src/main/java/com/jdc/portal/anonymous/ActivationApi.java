package com.jdc.portal.anonymous;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jdc.portal.anonymous.input.ActivationForm;
import com.jdc.portal.anonymous.service.EmployeeActivationService;
import com.jdc.portal.anonymous.service.StudentActivationService;
import com.jdc.portal.commons.dto.MessageResult;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("anonymous/activate")
@RequiredArgsConstructor
public class ActivationApi {

	private final StudentActivationService studentActivationService;
	private final EmployeeActivationService employeeActivationService;

	@PostMapping("student")
	MessageResult activateStudent(@Validated @RequestBody ActivationForm form) {
		return studentActivationService.activate(form);
	}
	
	@PostMapping("employee")
	MessageResult activateEmployee(@Validated @RequestBody ActivationForm form) {
		return employeeActivationService.activate(form);
	}

}

package com.jdc.portal.student;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jdc.portal.student.output.ProfileInfo;
import com.jdc.portal.student.service.StudentProfileService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/student/profile")
public class ProfileApi {
	
	private final StudentProfileService service;

	@GetMapping
	ProfileInfo getProfile(Authentication auth) {
		return service.getProfile(auth);
	}
}

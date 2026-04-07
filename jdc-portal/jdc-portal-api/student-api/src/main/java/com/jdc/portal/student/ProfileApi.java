package com.jdc.portal.student;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jdc.portal.student.output.ProfileInfo;

@RestController
@RequestMapping("/student/profile")
public class ProfileApi {

	@GetMapping
	ProfileInfo getProfile(Authentication auth) {
		return null;
	}
}

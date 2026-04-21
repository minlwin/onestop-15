package com.jdc.portal.student.service;


import static com.jdc.portal.commons.utils.NullSafetyUtils.safeCall;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jdc.portal.domains.account.repo.StudentRepo;
import com.jdc.portal.student.output.ProfileInfo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StudentProfileService {
	
	private final StudentRepo studentRepo;

	@Transactional(readOnly = true)
	public ProfileInfo getProfile(Authentication auth) {
		return safeCall(studentRepo.findOneByAccountEmail(auth.getName()).map(ProfileInfo::from), "Account", "email %s".formatted(auth.getName()));
	}

}

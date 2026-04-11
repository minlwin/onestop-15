package com.jdc.portal.domains.account.repo;

import com.jdc.portal.domains.BaseRepository;
import com.jdc.portal.domains.account.StudentActivation;

public interface StudentActivationRepo extends BaseRepository<StudentActivation, Integer> {

	long countByEmail(String email);

}

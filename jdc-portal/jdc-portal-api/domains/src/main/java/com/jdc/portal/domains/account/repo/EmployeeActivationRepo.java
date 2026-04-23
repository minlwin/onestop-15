package com.jdc.portal.domains.account.repo;

import java.util.Optional;

import com.jdc.portal.domains.BaseRepository;
import com.jdc.portal.domains.account.EmployeeActivation;

public interface EmployeeActivationRepo extends BaseRepository<EmployeeActivation, Integer> {

	long countByEmail(String email);
	
	Optional<EmployeeActivation> findOneByEmail(String email);

}

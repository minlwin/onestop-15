package com.jdc.portal.domains.account.repo;

import java.util.Optional;

import com.jdc.portal.domains.BaseRepository;
import com.jdc.portal.domains.account.Student;

public interface StudentRepo extends BaseRepository<Student, Integer> {

	Optional<Student> findOneByAccountEmail(String email);
}

package com.jdc.portal.domains.transaction.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.jdc.portal.domains.BaseRepository;
import com.jdc.portal.domains.transaction.Registration;

public interface RegistrationRepo extends BaseRepository<Registration, Long> {

	@Query("select r from Registration r where r.classes.id = :classId and r.student.id = :studentId")
	Optional<Registration> searchOne(@Param("classId") int classId, @Param("studentId") int studentId);

}

package com.jdc.portal.office.output;

import java.time.LocalDateTime;

import com.jdc.portal.domains.account.Student;

public record StudentDetails(
	    Integer id,
	    String name,
	    String phone,
	    String email,
	    LocalDateTime entryAt,
	    LocalDateTime activatedAt,
	    String createdBy,
	    String modifiedBy,
	    LocalDateTime createdAt,
	    LocalDateTime modifiedAt
) {
	public static StudentDetails from(Student entity) {
		return new StudentDetails(
				entity.getId(),
				entity.getActivatedAt() != null ? entity.getAccount().getName() : entity.getActivation().getName(),
				entity.getPhone(),
				entity.getActivatedAt() != null ? entity.getAccount().getEmail() : entity.getActivation().getEmail(),
				entity.getEntryAt(),
				entity.getActivatedAt(),
				entity.getCreatedBy(),
				entity.getUpdatedBy(),
				entity.getCreatedAt(),
				entity.getUpdatedAt()
		);
	}
}

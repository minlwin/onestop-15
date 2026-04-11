package com.jdc.portal.student.output;

import com.jdc.portal.domains.account.Student;

public record ProfileInfo(
		int id,
		String name,
		String email,
		String phone) {

	public static ProfileInfo from(Student entity) {
		return new ProfileInfo(
				entity.getId(),
				entity.getActivatedAt() != null ? entity.getAccount().getName() : entity.getActivation().getName(),
				entity.getActivatedAt() != null ? entity.getAccount().getEmail() : entity.getActivation().getEmail(),
				entity.getPhone()
		);
	}
}

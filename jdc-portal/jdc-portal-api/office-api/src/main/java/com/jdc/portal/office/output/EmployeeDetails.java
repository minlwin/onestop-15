package com.jdc.portal.office.output;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.jdc.portal.domains.account.Employee;
import com.jdc.portal.utils.consts.Position;

public record EmployeeDetails(
    Integer id,
    String name,
    Position position,
    String phone,
    String email,
    LocalDate entryAt,
    LocalDate resignAt,
    LocalDateTime activatedAt,
    String createdBy,
    String modifiedBy,
    LocalDateTime createdAt,
    LocalDateTime modifiedAt
) {
	
	public static EmployeeDetails from(Employee entity) {
		return new EmployeeDetails(
				entity.getId(),
				entity.getActivatedAt() != null ? entity.getAccount().getName() : entity.getActivation().getName(),
				entity.getPosition(),
				entity.getPhone(),
				entity.getActivatedAt() != null ? entity.getAccount().getEmail() : entity.getActivation().getEmail(),
				entity.getEntryAt(),
				entity.getResignAt(),
				entity.getActivatedAt(),
				entity.getCreatedBy(),
				entity.getUpdatedBy(),
				entity.getCreatedAt(),
				entity.getUpdatedAt()
		);
	}
}

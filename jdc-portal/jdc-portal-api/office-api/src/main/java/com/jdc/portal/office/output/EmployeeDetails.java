package com.jdc.portal.office.output;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.jdc.portal.domains.account.Employee;
import com.jdc.portal.dto.consts.Position;

public record EmployeeDetails(
    Integer id,
    String name,
    Position position,
    String phone,
    String email,
    LocalDate entryAt,
    LocalDate resignAt,
    String createdBy,
    String modifiedBy,
    LocalDateTime createdAt,
    LocalDateTime modifiedAt
) {
	
	public static EmployeeDetails from(Employee entity) {
		return new EmployeeDetails(
				entity.getId(),
				entity.getAccount().getName(),
				entity.getPosition(),
				entity.getPhone(),
				entity.getAccount().getEmail(),
				entity.getEntryAt(),
				entity.getResignAt(),
				entity.getCreatedBy(),
				entity.getUpdatedBy(),
				entity.getCreatedAt(),
				entity.getUpdatedAt()
		);
	}
}

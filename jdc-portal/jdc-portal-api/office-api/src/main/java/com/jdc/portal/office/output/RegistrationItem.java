package com.jdc.portal.office.output;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.jdc.portal.dto.consts.ClassType;
import com.jdc.portal.dto.consts.RegistrationStatus;

public record RegistrationItem(
		long id,
		int studentId,
		int classId,
		String course,
		LocalDate startDate,
		ClassType classType,
		String studentName,
		String email,
		String phone,
		RegistrationStatus status,
		LocalDateTime registerAt,
		String rejectReason
) {

}

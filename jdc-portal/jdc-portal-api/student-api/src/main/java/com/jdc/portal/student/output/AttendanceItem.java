package com.jdc.portal.student.output;

import java.time.LocalDate;

import com.jdc.portal.domains.utils.consts.AttendanceStatus;

public record AttendanceItem(
		LocalDate date,
		String checkIn,
		String checkOut,
		AttendanceStatus status,
		String remark) {

}

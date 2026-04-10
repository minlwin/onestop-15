package com.jdc.portal.office.output;

import java.time.LocalDate;

import com.jdc.portal.dto.consts.ClassType;
import com.jdc.portal.dto.consts.CourseLevel;

public record ClassForStudent(
	int id,
	ClassType type,
	String course,
	CourseLevel courseLevel,
	LocalDate startDate,
	int months,
	int registrationFee,
	int monthlyFee,
	int studentId,
	long attended,
	long late,
	long absent,
	long leave,
	int lastPayment,
	int paidFees
) {

}

package com.jdc.portal.office.output;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.jdc.portal.dto.consts.ClassType;
import com.jdc.portal.dto.consts.CourseLevel;

public record ClassDetails(
	int id,
	ClassType type,
	String course,
	CourseLevel courseLevel,
	LocalDate startDate,
	int months,
	int registrationFee,
	int monthlyFee,
	String days,
	String startTime,
	String endTime,
    String createdBy,
    String modifiedBy,
    LocalDateTime createdAt,
    LocalDateTime modifiedAt	    
) {

	public String getTime() {
		return "%s - %s".formatted(startTime, endTime);
	}
}

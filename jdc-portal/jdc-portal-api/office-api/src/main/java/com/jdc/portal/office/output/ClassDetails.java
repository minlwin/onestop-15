package com.jdc.portal.office.output;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.jdc.portal.domains.master.Classes;
import com.jdc.portal.domains.utils.consts.ClassType;
import com.jdc.portal.domains.utils.consts.CourseLevel;

public record ClassDetails(
	int id,
	ClassType type,
	String course,
	CourseLevel courseLevel,
	LocalDate startDate,
	int months,
	int registrationFee,
	int monthlyFee,
	String[] dayArray,
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
	
	public String getDays() {
		return String.join(", ", dayArray);
	}
	
	public static ClassDetails from(Classes entity) {
		return new ClassDetails(
				entity.getId(),
				entity.getType(),
				entity.getCourse().getName(),
				entity.getCourse().getLevel(),
				entity.getStartDate(),
				entity.getMonths(),
				entity.getRegistrationFee(),
				entity.getMonthlyFee(),
				entity.getDays(),
				entity.getTimeFrom(),
				entity.getTimeTo(),
				entity.getCreatedBy(),
				entity.getUpdatedBy(),
				entity.getCreatedAt(),
				entity.getUpdatedAt()
		);
	}
}

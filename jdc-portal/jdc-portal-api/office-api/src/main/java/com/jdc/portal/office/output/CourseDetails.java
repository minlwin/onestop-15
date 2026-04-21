package com.jdc.portal.office.output;

import java.time.LocalDateTime;
import java.util.List;

import com.jdc.portal.domains.master.Course;
import com.jdc.portal.utils.consts.CourseLevel;
import com.jdc.portal.utils.dto.CourseContent;

public record CourseDetails(
    Integer id,
    String name,
    CourseLevel level,
    Integer hours,
    String description,
    List<CourseContent> contents,
    String createdBy,
    String modifiedBy,
    LocalDateTime createdAt,
    LocalDateTime modifiedAt	    
) {

	public static CourseDetails from(Course entity) {
		return new CourseDetails(
				entity.getId(),
				entity.getName(),
				entity.getLevel(),
				entity.getHours(),
				entity.getDescription(),
				entity.getContents(),
				entity.getCreatedBy(),
				entity.getUpdatedBy(),
				entity.getCreatedAt(),
				entity.getUpdatedAt()
		);
	}
}

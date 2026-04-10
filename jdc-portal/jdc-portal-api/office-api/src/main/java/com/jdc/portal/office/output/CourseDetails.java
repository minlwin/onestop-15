package com.jdc.portal.office.output;

import java.time.LocalDateTime;
import java.util.List;

import com.jdc.portal.dto.CourseContent;
import com.jdc.portal.dto.consts.CourseLevel;

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

}

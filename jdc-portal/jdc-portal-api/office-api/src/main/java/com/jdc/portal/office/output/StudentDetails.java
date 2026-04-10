package com.jdc.portal.office.output;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record StudentDetails(
	    Integer id,
	    String name,
	    String position,
	    String phone,
	    String email,
	    LocalDate entryAt,
	    LocalDateTime activatedAt,
	    String createdBy,
	    String modifiedBy,
	    LocalDateTime createdAt,
	    LocalDateTime modifiedAt
) {

}

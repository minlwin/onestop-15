package com.jdc.portal.office.output;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record StudentItem(
	    Integer id,
	    String name,
	    String position,
	    String phone,
	    String email,
	    LocalDate entryAt,
	    LocalDateTime activatedAt
) {

}

package com.jdc.portal.office.input;

import java.time.LocalDate;

public record ClassSearch(
	    Integer studentId,
	    String course,
	    String type,
	    LocalDate startFrom,
	    LocalDate startTo,
	    String keyword) {

}

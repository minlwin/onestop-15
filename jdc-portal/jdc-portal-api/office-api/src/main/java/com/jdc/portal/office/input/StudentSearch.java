package com.jdc.portal.office.input;

import java.time.LocalDate;

public record StudentSearch(
		Integer classId,
		LocalDate entryFrom,
		LocalDate entryTo,
		String keyword
		) {

}

package com.jdc.portal.office.input;

import java.time.LocalDate;

import com.jdc.portal.domains.utils.consts.ClassType;
import com.jdc.portal.domains.utils.consts.RegistrationStatus;

public record RegistrationSearch(
		ClassType classType,
		RegistrationStatus status,
		LocalDate dateFrom,
		LocalDate dateTo,
		String keyword) {

}

package com.jdc.portal.office.input;

import com.jdc.portal.dto.consts.Position;

public record EmployeeSearch(
		Position position,
		String keyword) {

}

package com.jdc.portal.utils.consts;

import com.jdc.portal.utils.dto.Option;

public enum CourseLevel implements Option{
	Beginner, Intermediate, Advance, All;

	@Override
	public String getLabel() {
		return name();
	}

	@Override
	public String getValue() {
		return name();
	}
}

package com.jdc.portal.dto.consts;

import com.jdc.portal.OptionWrapper;

public enum CourseLevel implements OptionWrapper{
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

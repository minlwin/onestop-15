package com.jdc.portal.dto.consts;

import com.jdc.portal.OptionWrapper;

public enum Position implements OptionWrapper{
	Staff, Teacher;

	@Override
	public String getLabel() {
		return name();
	}

	@Override
	public String getValue() {
		return name();
	}

}

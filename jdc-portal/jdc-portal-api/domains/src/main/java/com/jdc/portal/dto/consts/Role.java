package com.jdc.portal.dto.consts;

import com.jdc.portal.OptionWrapper;

public enum Role implements OptionWrapper{
	Student, Office, Admin;

	@Override
	public String getLabel() {
		return name();
	}

	@Override
	public String getValue() {
		return name();
	}
}

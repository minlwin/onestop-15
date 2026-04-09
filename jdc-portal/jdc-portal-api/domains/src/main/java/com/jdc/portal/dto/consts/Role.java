package com.jdc.portal.dto.consts;

import com.jdc.portal.dto.Option;

public enum Role implements Option{
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

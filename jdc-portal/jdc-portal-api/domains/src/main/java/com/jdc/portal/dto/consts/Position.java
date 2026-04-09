package com.jdc.portal.dto.consts;

import com.jdc.portal.dto.Option;

public enum Position implements Option{
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

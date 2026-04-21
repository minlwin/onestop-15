package com.jdc.portal.utils.consts;

import com.jdc.portal.utils.dto.Option;

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

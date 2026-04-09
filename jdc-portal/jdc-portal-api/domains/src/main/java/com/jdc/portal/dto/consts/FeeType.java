package com.jdc.portal.dto.consts;

import com.jdc.portal.dto.Option;

public enum FeeType implements Option{
	Registration, Monthly, Total;

	@Override
	public String getLabel() {
		return name();
	}

	@Override
	public String getValue() {
		return name();
	}
}

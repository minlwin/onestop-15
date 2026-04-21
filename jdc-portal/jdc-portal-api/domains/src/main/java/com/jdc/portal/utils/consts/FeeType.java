package com.jdc.portal.utils.consts;

import com.jdc.portal.utils.dto.Option;

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

package com.jdc.portal.dto.consts;

import com.jdc.portal.OptionWrapper;

public enum FeeType implements OptionWrapper{
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

package com.jdc.portal.dto.consts;

import com.jdc.portal.OptionWrapper;

public enum ClassType implements OptionWrapper{
	Campus, Zoom, Video, Online;

	@Override
	public String getLabel() {
		return name();
	}

	@Override
	public String getValue() {
		return name();
	}
}

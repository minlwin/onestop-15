package com.jdc.portal.dto.consts;

import com.jdc.portal.dto.Option;

public enum ClassType implements Option{
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

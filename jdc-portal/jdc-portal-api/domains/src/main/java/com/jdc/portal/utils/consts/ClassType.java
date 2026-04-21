package com.jdc.portal.utils.consts;

import com.jdc.portal.utils.dto.Option;

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

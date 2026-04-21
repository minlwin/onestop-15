package com.jdc.portal.domains.utils.consts;

import com.jdc.portal.domains.utils.dto.Option;

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

package com.jdc.portal.domains.utils.consts;

import com.jdc.portal.domains.utils.dto.Option;

public enum RegistrationStatus implements Option {
	
	Applied, Approved, Rejected;

	@Override
	public String getLabel() {
		return name();
	}

	@Override
	public String getValue() {
		return name();
	}

}

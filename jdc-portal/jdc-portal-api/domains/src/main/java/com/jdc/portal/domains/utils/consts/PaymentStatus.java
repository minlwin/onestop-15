package com.jdc.portal.domains.utils.consts;

import com.jdc.portal.domains.utils.dto.Option;

public enum PaymentStatus implements Option{
	Pending, Paid, Rejected;

	@Override
	public String getLabel() {
		return name();
	}

	@Override
	public String getValue() {
		return name();
	}
}

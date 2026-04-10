package com.jdc.portal.dto.consts;

import com.jdc.portal.dto.Option;

public enum PaymentStatus implements Option{
	Pending, Paid, Retry;

	@Override
	public String getLabel() {
		return name();
	}

	@Override
	public String getValue() {
		return name();
	}
}

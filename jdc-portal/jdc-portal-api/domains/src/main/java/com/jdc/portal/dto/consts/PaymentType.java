package com.jdc.portal.dto.consts;

import com.jdc.portal.dto.Option;

public enum PaymentType implements Option{
	
	Banking, eWallet, Office;

	@Override
	public String getLabel() {
		return name();
	}

	@Override
	public String getValue() {
		return name();
	}
}

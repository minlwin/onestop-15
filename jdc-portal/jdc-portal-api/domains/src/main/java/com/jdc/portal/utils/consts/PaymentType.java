package com.jdc.portal.utils.consts;

import com.jdc.portal.utils.dto.Option;

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

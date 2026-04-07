package com.jdc.portal.dto.consts;

import com.jdc.portal.OptionWrapper;

public enum PaymentType implements OptionWrapper{
	KPay("KBZ Pay"), AyaPay("AYA Pay"), WavePay("Wave Pay"), Office("Office");
	
	private String value;

	private PaymentType(String value) {
		this.value = value;
	}
	
	public String getDisplayName() {
		return value;
	}

	@Override
	public String getLabel() {
		return getDisplayName();
	}

	@Override
	public String getValue() {
		return name();
	}
}

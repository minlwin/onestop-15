package com.jdc.portal.dto.consts;

public enum PaymentType {
	KPay("KBZ Pay"), AyaPay("AYA Pay"), WavePay("Wave Pay"), Office("Office");
	
	private String value;

	private PaymentType(String value) {
		this.value = value;
	}
	
	public String getDisplayName() {
		return value;
	}
}

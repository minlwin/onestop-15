package com.jdc.portal.anonymous.output;

import com.jdc.portal.domains.master.PaymentAccount;

public record PaymentInfo(
		Integer code,
		String name,
		String accountNumber,
		String accountName) {

	public PaymentInfo(PaymentAccount account) {
		this(
		account.getId(), 
		account.getProvider(), 
		account.getAccountNo(), 
		account.getAccountName());
	}
}

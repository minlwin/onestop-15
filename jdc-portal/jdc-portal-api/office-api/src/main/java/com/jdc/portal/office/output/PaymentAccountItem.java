package com.jdc.portal.office.output;

import com.jdc.portal.domains.master.PaymentAccount;
import com.jdc.portal.utils.consts.PaymentType;

public record PaymentAccountItem(
		int id,
		PaymentType type,
		String provider,
		String accountNo,
		String accountName, 
		boolean deleted) {

	public PaymentAccountItem(PaymentAccount entity) {
		this(
			entity.getId(), 
			entity.getType(),
			entity.getProvider(),
			entity.getAccountNo(),
			entity.getAccountName(),
			entity.isDeleted()
		);
	}
}

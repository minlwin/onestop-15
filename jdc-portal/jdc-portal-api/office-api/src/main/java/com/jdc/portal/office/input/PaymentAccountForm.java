package com.jdc.portal.office.input;

import com.jdc.portal.domains.master.PaymentAccount;
import com.jdc.portal.domains.utils.consts.PaymentType;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record PaymentAccountForm(
		@NotNull(message = "Please select a payment type")
		PaymentType type,
		@NotBlank(message = "Please enter provider name")
		String provider,
		@NotBlank(message = "Please enter account number")
		String accountNo,
		@NotBlank(message = "Please enter account name")
		String accountName) {

	public PaymentAccount toEntity() {
		var entity = new PaymentAccount();
		entity.setType(type);
		entity.setProvider(provider);
		entity.setAccountNo(accountNo);
		entity.setAccountName(accountName);
		return entity;
	}

	public void updateEntity(PaymentAccount entity) {
		entity.setType(type);
		entity.setProvider(provider);
		entity.setAccountNo(accountNo);
		entity.setAccountName(accountName);
	}

}

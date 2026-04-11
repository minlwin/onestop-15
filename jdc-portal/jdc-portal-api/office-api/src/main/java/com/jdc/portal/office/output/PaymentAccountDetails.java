package com.jdc.portal.office.output;

import java.time.LocalDateTime;

import com.jdc.portal.domains.master.PaymentAccount;
import com.jdc.portal.dto.consts.PaymentType;

public record PaymentAccountDetails(
		int id,
		PaymentType type,
		String provider,
		String accountNo,
		String accountName, 
		boolean deleted,
	    String createdBy,
	    String modifiedBy,
	    LocalDateTime createdAt,
	    LocalDateTime modifiedAt
		) {

	public PaymentAccountDetails(PaymentAccount entity) {
		this(
			entity.getId(), 
			entity.getType(),
			entity.getProvider(),
			entity.getAccountNo(),
			entity.getAccountName(),
			entity.isDeleted(),
			entity.getCreatedBy(),
			entity.getUpdatedBy(),
			entity.getCreatedAt(),
			entity.getUpdatedAt()
		);
	}	
}

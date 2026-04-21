package com.jdc.portal.domains.transaction;

import java.time.LocalDateTime;

import com.jdc.portal.domains.AbstractEntity;
import com.jdc.portal.domains.master.PaymentAccount;
import com.jdc.portal.utils.consts.FeeType;
import com.jdc.portal.utils.consts.PaymentStatus;
import com.jdc.portal.utils.consts.PaymentType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
public class Payment extends AbstractEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@ManyToOne(optional = false)
	private Registration registration;
	
	@Column(nullable = false)
	private FeeType feeType;

	@Column(nullable = false)
	private PaymentStatus status;
	
	@Column(nullable = false)
	private LocalDateTime payAt;
	
	@Column(nullable = false)
	private int amount;
	
	@ManyToOne(optional = true)
	private PaymentAccount account;
	
	private String slip;
	
	private PaymentType type;
}

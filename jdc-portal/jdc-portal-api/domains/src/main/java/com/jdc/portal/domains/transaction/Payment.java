package com.jdc.portal.domains.transaction;

import java.time.LocalDateTime;

import com.jdc.portal.domains.AbstractEntity;
import com.jdc.portal.dto.consts.FeeType;
import com.jdc.portal.dto.consts.PaymentStatus;
import com.jdc.portal.dto.consts.PaymentType;

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
	
	private PaymentType type;
	
	@Column(nullable = false)
	private FeeType feeType;

	@Column(nullable = false)
	private PaymentStatus status;
	
	@Column(nullable = false)
	private LocalDateTime payAt;
	
	@Column(nullable = false)
	private int amount;
	
	private String slip;
}

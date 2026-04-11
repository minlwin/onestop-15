package com.jdc.portal.domains.master;

import com.jdc.portal.domains.AbstractEntity;
import com.jdc.portal.dto.consts.PaymentType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
public class PaymentAccount extends AbstractEntity{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(nullable = false)
	private PaymentType type;

	@Column(nullable = false)
	private String provider;
	
	@Column(nullable = false)
	private String accountNo;
	
	@Column(nullable = false)
	private String accountName;

	@Column(nullable = false)
	private boolean deleted;
}

package com.jdc.portal.domains.account;

import java.time.LocalDateTime;

import com.jdc.portal.domains.AbstractEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
public class Student extends AbstractEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@OneToOne(optional = true)
	private Account account;
	
	@Column(nullable = false)
	private String phone;
	
	@Column(nullable = false)
	private LocalDateTime entryAt;
	
	private LocalDateTime activatedAt;
}

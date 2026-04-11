package com.jdc.portal.domains.account;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.jdc.portal.domains.AbstractEntity;
import com.jdc.portal.dto.consts.Position;

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
public class Employee extends AbstractEntity{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@OneToOne(optional = true)
	private Account account;
	
	@OneToOne(optional = true, mappedBy = "account")
	private EmployeeActivation activation;
	
	@Column(nullable = false)
	private Position position;
	
	@Column(nullable = false)
	private String phone;

	@Column(nullable = false)
	private LocalDate entryAt;
	
	private LocalDate resignAt;
	
	private LocalDateTime activatedAt;
	
}

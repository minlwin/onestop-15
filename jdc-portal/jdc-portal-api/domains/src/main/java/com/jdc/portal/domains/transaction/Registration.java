package com.jdc.portal.domains.transaction;

import java.time.LocalDateTime;

import com.jdc.portal.domains.AbstractEntity;
import com.jdc.portal.domains.account.Student;
import com.jdc.portal.domains.master.Classes;
import com.jdc.portal.dto.consts.RegistrationStatus;

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
public class Registration extends AbstractEntity{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@ManyToOne(optional = false)
	private Classes classes;
	
	@ManyToOne(optional = false)
	private Student student;
	
	@Column(nullable = false)
	private LocalDateTime registerAt;
	
	@Column(nullable = false)
	private RegistrationStatus status;
	
	private int lastPaid;
}

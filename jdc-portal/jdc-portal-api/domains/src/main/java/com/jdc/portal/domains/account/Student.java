package com.jdc.portal.domains.account;

import java.time.LocalDateTime;
import java.util.List;

import com.jdc.portal.domains.AbstractEntity;
import com.jdc.portal.domains.transaction.Registration;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
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
	
	@OneToOne(optional = true, mappedBy = "account")
	private StudentActivation activation;
	
	@Column(nullable = false)
	private String phone;
	
	@Column(nullable = false)
	private LocalDateTime entryAt;

	private LocalDateTime activatedAt;
	
	@OneToMany(mappedBy = "student")
	private List<Registration> registrations;
	
}

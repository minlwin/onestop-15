package com.jdc.portal.domains.account;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import lombok.Data;

@Data
@Entity
public class EmployeeActivation {

	@Id
	private int id;
	
	@MapsId
	@OneToOne(optional = false)
	private Employee account;
	
	@Column(nullable = false)
	private String code;
	
	@Column(nullable = false)
	private String name;

	@Column(nullable = false, unique = true)
	private String email;
	
	private LocalDateTime sendAt;

}

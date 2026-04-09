package com.jdc.portal.domains.account;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import lombok.Data;

@Data
@Entity
public class Activation {

	@Id
	private int id;
	
	@MapsId
	@OneToOne(optional = false)
	private Student student;
	
	@Column(nullable = false)
	private String code;
}

package com.jdc.portal.domains.account;

import com.jdc.portal.domains.AbstractEntity;
import com.jdc.portal.dto.consts.Role;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@Table(uniqueConstraints = {
	@UniqueConstraint(columnNames = {
		"email",
		"role"
	})	
})
@EqualsAndHashCode(callSuper = true)
public class Account extends AbstractEntity{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(nullable = false)
	private String name;
	
	@Column(nullable = false)
	private String email;
	
	@Column(nullable = false)
	private String password;

	@Column(nullable = false)
	private Role role;
}

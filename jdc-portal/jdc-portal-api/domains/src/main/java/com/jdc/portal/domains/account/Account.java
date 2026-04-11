package com.jdc.portal.domains.account;

import java.util.ArrayList;
import java.util.List;

import com.jdc.portal.domains.AbstractEntity;
import com.jdc.portal.dto.consts.Role;
import com.jdc.portal.utils.converter.RolesConverter;

import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
public class Account extends AbstractEntity{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(nullable = false)
	private String name;
	
	@Column(nullable = false, unique = true)
	private String email;
	
	@Column(nullable = false)
	private String password;

	@Column(nullable = false)
	@Convert(converter = RolesConverter.class)
	private List<Role> roles = new ArrayList<>();
		
}

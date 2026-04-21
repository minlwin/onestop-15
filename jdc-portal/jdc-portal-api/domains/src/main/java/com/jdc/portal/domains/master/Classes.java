package com.jdc.portal.domains.master;

import java.time.LocalDate;
import java.util.List;

import com.jdc.portal.domains.AbstractEntity;
import com.jdc.portal.domains.transaction.Registration;
import com.jdc.portal.utils.consts.ClassType;
import com.jdc.portal.utils.converter.ClassDaysConverter;

import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
public class Classes extends AbstractEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@ManyToOne(optional = false)
	private Course course;
	
	@Column(nullable = false)
	private ClassType type;
	
	@Column(nullable = false)
	private LocalDate startDate;
	
	@Column(nullable = false)
	private int months;
	
	@Column(nullable = false)
	private int registrationFee;
	
	@Column(nullable = false)
	private int monthlyFee;
	
	@Column(nullable = false)
	@Convert(converter = ClassDaysConverter.class)
	private String[] days;
	
	@Column(nullable = false)
	private String timeFrom;
	
	@Column(nullable = false)
	private String timeTo;
	
	@OneToMany(mappedBy = "classes")
	private List<Registration> registrations;
}

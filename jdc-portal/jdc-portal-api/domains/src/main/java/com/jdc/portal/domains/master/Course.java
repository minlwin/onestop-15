package com.jdc.portal.domains.master;

import java.util.List;

import com.jdc.portal.domains.AbstractEntity;
import com.jdc.portal.utils.consts.CourseLevel;
import com.jdc.portal.utils.converter.CourseContentConverter;
import com.jdc.portal.utils.dto.CourseContent;

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
public class Course extends AbstractEntity{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(nullable = false)
	private String name;

	@Column(nullable = false)
	private CourseLevel level;

	@Column(nullable = false)
	private int hours;

	@Column(nullable = false)
	private String description;
	
	@Column(columnDefinition = "TEXT")
	@Convert(converter = CourseContentConverter.class)
	private List<CourseContent> contents;
}

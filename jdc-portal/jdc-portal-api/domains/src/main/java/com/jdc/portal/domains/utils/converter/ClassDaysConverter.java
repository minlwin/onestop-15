package com.jdc.portal.domains.utils.converter;

import java.util.Arrays;
import java.util.stream.Collectors;

import org.springframework.util.StringUtils;

import jakarta.persistence.AttributeConverter;

public class ClassDaysConverter implements AttributeConverter<String[], String>{

	@Override
	public String convertToDatabaseColumn(String[] attribute) {
		if(null != attribute) {
			return Arrays.stream(attribute).collect(Collectors.joining(","));
		}
		return null;
	}

	@Override
	public String[] convertToEntityAttribute(String dbData) {
		
		if(StringUtils.hasLength(dbData)) {
			return dbData.split(",");
		}
		
		return null;
	}

}

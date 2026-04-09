package com.jdc.portal.utils.converter;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jdc.portal.dto.CourseContent;

import jakarta.persistence.AttributeConverter;

@Component
public class CourseContentConverter implements AttributeConverter<List<CourseContent>, String> {

	@Autowired
	private ObjectMapper objectMapper;

	@Override
	public String convertToDatabaseColumn(List<CourseContent> attribute) {
		try {
			if (null != attribute && !attribute.isEmpty()) {
				return objectMapper.writeValueAsString(attribute);
			}

			return null;
		} catch (JsonProcessingException e) {
			throw new RuntimeException(e);
		}
	}

	@Override
	public List<CourseContent> convertToEntityAttribute(String dbData) {
		try {
			if (StringUtils.hasLength(dbData)) {
				return objectMapper.readValue(dbData, new TypeReference<List<CourseContent>>() {});
			}

			return List.of();
		} catch (JsonProcessingException e) {
			throw new RuntimeException(e);
		}
	}

}

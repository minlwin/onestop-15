package com.jdc.portal.utils.converter;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import com.jdc.portal.dto.consts.Role;

import jakarta.persistence.AttributeConverter;

public class RolesConverter implements AttributeConverter<List<Role>, String> {

	@Override
	public String convertToDatabaseColumn(List<Role> attribute) {
		if (attribute == null || attribute.isEmpty()) {
			return "";
		}
		return attribute.stream().map(Role::name).collect(Collectors.joining(","));
	}

	@Override
	public List<Role> convertToEntityAttribute(String dbData) {
		if (dbData == null || dbData.isEmpty()) {
			return List.of();
		}
		return Arrays.stream(dbData.split(",")).map(Role::valueOf).collect(Collectors.toList());
	}

}

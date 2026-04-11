package com.jdc.portal.dto;

import com.jdc.portal.dto.consts.Role;

public record ActivationEvent(
		int id,
		String name,
		Role role,
		String email) {

}

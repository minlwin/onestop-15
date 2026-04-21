package com.jdc.portal.commons.dto;

import com.jdc.portal.utils.consts.Role;

public record ActivationEvent(
		int id,
		String name,
		Role role,
		String email) {

}

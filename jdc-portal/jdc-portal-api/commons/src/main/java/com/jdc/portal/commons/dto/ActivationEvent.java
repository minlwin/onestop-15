package com.jdc.portal.commons.dto;

import com.jdc.portal.domains.utils.consts.Role;

public record ActivationEvent(
		int id,
		String name,
		Role role,
		String email) {

}

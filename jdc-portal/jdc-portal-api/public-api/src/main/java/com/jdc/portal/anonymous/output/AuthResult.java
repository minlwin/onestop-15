package com.jdc.portal.anonymous.output;

import java.util.List;

import com.jdc.portal.dto.consts.Role;

public record AuthResult(
		String email,
		String name,
		List<Role> role,
		String accessToken,
		String refreshToken) {

}

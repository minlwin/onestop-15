package com.jdc.portal.anonymous.output;

import com.jdc.portal.dto.consts.Role;

public record AuthResult(
		String email,
		String name,
		Role role,
		String accessToken,
		String refreshToken) {

}

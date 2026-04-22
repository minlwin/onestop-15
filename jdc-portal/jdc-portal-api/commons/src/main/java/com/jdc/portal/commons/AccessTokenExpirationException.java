package com.jdc.portal.commons;

import org.jspecify.annotations.Nullable;
import org.springframework.security.core.AuthenticationException;

public class AccessTokenExpirationException extends AuthenticationException {

	private static final long serialVersionUID = 1L;

	public AccessTokenExpirationException(@Nullable String msg, Throwable cause) {
		super(msg, cause);
	}

	public AccessTokenExpirationException(@Nullable String msg) {
		super(msg);
	}
}

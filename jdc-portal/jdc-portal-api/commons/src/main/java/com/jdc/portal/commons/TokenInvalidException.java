package com.jdc.portal.commons;

import org.jspecify.annotations.Nullable;
import org.springframework.security.core.AuthenticationException;

public class TokenInvalidException extends AuthenticationException{

	private static final long serialVersionUID = 1L;

	public TokenInvalidException(@Nullable String msg, Throwable cause) {
		super(msg, cause);
	}
}

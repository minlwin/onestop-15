package com.jdc.portal.commons;

public class JdcBusinessException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public JdcBusinessException(String message, Throwable cause) {
		super(message, cause);
	}

	public JdcBusinessException(String message) {
		super(message);
	}

}

package com.jdc.portal.handler;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.jdc.portal.commons.AccessTokenExpirationException;
import com.jdc.portal.commons.JdcBusinessException;
import com.jdc.portal.commons.TokenInvalidException;

@RestControllerAdvice
public class JdcPortalExceptionHandler {

	@ExceptionHandler
	@ResponseStatus(code = HttpStatus.BAD_REQUEST)
	List<String> handle(MethodArgumentNotValidException e) {
		return e.getFieldErrors().stream().map(a -> a.getDefaultMessage())
				.toList();
	}

	@ExceptionHandler
	@ResponseStatus(code = HttpStatus.BAD_REQUEST)
	List<String> handle(JdcBusinessException e) {
		return List.of(e.getMessage());
	}
	
	@ExceptionHandler
	@ResponseStatus(code = HttpStatus.REQUEST_TIMEOUT)
	List<String> handle(AccessTokenExpirationException e) {
		return List.of(e.getMessage());
	}
	
	@ExceptionHandler
	@ResponseStatus(code = HttpStatus.UNAUTHORIZED)
	List<String> handle(AuthenticationException e) {
		return switch(e) {
		case UsernameNotFoundException _ -> List.of("Please check your login id.");
		case BadCredentialsException _ -> List.of("Please check your password.");
		case TokenInvalidException ex -> List.of(ex.getMessage());
		default -> List.of("Authentication Fails.");
		};
	}
	
	@ExceptionHandler
	@ResponseStatus(code = HttpStatus.INTERNAL_SERVER_ERROR)
	List<String> handle(Throwable e) {
		e.printStackTrace();
		return List.of(e.getMessage());
	}
	
}

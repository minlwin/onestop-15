package com.jdc.portal.commons.security;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public class JwtTokenProvider {

	public String generateAccess(Authentication authentication) {
		// TODO Auto-generated method stub
		return null;
	}

	public String generateRefresh(Authentication authentication) {
		// TODO Auto-generated method stub
		return null;
	}

	public Authentication parseAccess(String token) {
		// TODO Auto-generated method stub
		return null;
	}

	public Authentication parseRefresh(String token) {
		// TODO Auto-generated method stub
		return null;
	}

}

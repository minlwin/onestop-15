package com.jdc.portal.commons.security;

import java.util.Arrays;
import java.util.Calendar;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

import javax.crypto.SecretKey;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.ott.InvalidOneTimeTokenException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import com.jdc.portal.commons.AccessTokenExpirationException;
import com.jdc.portal.commons.TokenInvalidException;
import com.jdc.portal.commons.props.JwtTokenProperties;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class JwtTokenProvider {

	private static final SecretKey SIGN_KEY = Jwts.SIG.HS512.key().build();
	private static final String TYPE = "typ";
	private static final String AUTH = "aut";
	
	private final JwtTokenProperties props;
	
	public enum TokenType {
		Access, Refresh
	}

	public String generateAccess(Authentication authentication) {
		return generate(authentication, TokenType.Access);
	}

	public String generateRefresh(Authentication authentication) {
		return generate(authentication, TokenType.Refresh);
	}

	public Authentication parseAccess(String token) {
		try {
			return parse(token, TokenType.Access);
		} catch(ExpiredJwtException e) {
			throw new AccessTokenExpirationException("Access token has been expired.", e);
		} catch(JwtException e) {
			throw new TokenInvalidException(e.getMessage(), e);
		}
	}

	public Authentication parseRefresh(String token) {
		try {
			return parse(token, TokenType.Refresh);
		} catch(ExpiredJwtException e) {
			throw new TokenInvalidException("Refresh token has been expired.", e);
		} catch(JwtException e) {
			throw new TokenInvalidException(e.getMessage(), e);
		}
	}

	private String generate(Authentication authentication, TokenType type) {
		
		var issueAt = new Date();
		var expireAt = expireAt(issueAt, type);
		
		return Jwts.builder()
			.signWith(SIGN_KEY)
			.subject(authentication.getName())
			.claim(TYPE, type)
			.claim(AUTH, authorities(authentication.getAuthorities()))
			.issuer(props.getIssuer())
			.issuedAt(issueAt)
			.expiration(expireAt)
			.compact();
	}

	private Authentication parse(String token, TokenType type) {
		
		var payload = Jwts.parser()
			.verifyWith(SIGN_KEY)
			.requireIssuer(props.getIssuer())
			.build()
			.parseSignedClaims(token)
			.getPayload();
		
		if(type.name().equals(payload.get(TYPE, String.class))) {
			throw new InvalidOneTimeTokenException("Your token type is %s token. But we need %s token.".formatted(type.name(), type));
		}
		
		var username = payload.getSubject();
		var authorityStr = payload.get(AUTH, String.class);
		var authorities = Arrays.stream(authorityStr.split(","))
				.map(SimpleGrantedAuthority::new)
				.toList();
		
		return UsernamePasswordAuthenticationToken.authenticated(username, null, authorities);
	}

	private Date expireAt(Date issueAt, TokenType type) {
		var calendar = Calendar.getInstance();
		calendar.setTime(issueAt);
		
		var life = switch(type) {
		case Access -> props.getAccessLife();
		case Refresh -> props.getRefreshLife();
		};
		
		calendar.add(Calendar.MINUTE, life);
		
		return calendar.getTime();
	}

	private String authorities(Collection<? extends GrantedAuthority> authorities) {
		return authorities.stream()
				.map(a -> a.getAuthority())
				.collect(Collectors.joining(","));
	}

}

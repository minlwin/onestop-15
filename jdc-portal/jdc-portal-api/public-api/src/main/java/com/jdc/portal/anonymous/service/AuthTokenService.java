package com.jdc.portal.anonymous.service;

import static com.jdc.portal.commons.utils.NullSafetyUtils.safeCall;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jdc.portal.anonymous.input.SignInForm;
import com.jdc.portal.anonymous.input.TokenForm;
import com.jdc.portal.anonymous.output.AuthResult;
import com.jdc.portal.commons.security.JwtTokenProvider;
import com.jdc.portal.domains.account.repo.AccountRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AuthTokenService {
	
	private final AuthenticationManager authenticationManager;
	private final JwtTokenProvider tokenProvider;
	private final AccountRepo accountRepo;

	public AuthResult signIn(SignInForm form) {
		
		var authentication = authenticationManager.authenticate(form.authentication());
		var account = safeCall(accountRepo.findOneByEmail(form.email()), "Account", "email : %s".formatted(form.email()));
		
		return AuthResult.withEmail(form.email())
				.name(account.getName())
				.role(account.getRoles())
				.accessToken(tokenProvider.generateAccess(authentication))
				.refreshToken(tokenProvider.generateRefresh(authentication))
				.build();
	}

	public AuthResult refresh(TokenForm form) {
		
		var authentication = tokenProvider.parseRefresh(form.token());	
		var account = safeCall(accountRepo.findOneByEmail(authentication.getName()), "Account", "email : %s".formatted(authentication.getName()));
		
		return AuthResult.withEmail(authentication.getName())
				.name(account.getName())
				.role(account.getRoles())
				.accessToken(tokenProvider.generateAccess(authentication))
				.refreshToken(tokenProvider.generateRefresh(authentication))
				.build();
	}

}

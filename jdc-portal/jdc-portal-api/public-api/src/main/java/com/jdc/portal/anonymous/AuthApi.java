package com.jdc.portal.anonymous;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jdc.portal.anonymous.input.ActivationForm;
import com.jdc.portal.anonymous.input.SignInForm;
import com.jdc.portal.anonymous.input.TokenForm;
import com.jdc.portal.anonymous.output.AuthResult;
import com.jdc.portal.anonymous.service.ActivationService;
import com.jdc.portal.anonymous.service.AuthTokenService;
import com.jdc.portal.commons.dto.MessageResult;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/anonymous/auth")
public class AuthApi {
	
	private final ActivationService activationService;
	private final AuthTokenService tokenService;

	@PostMapping("activate")
	MessageResult activate(@Validated @RequestBody ActivationForm form) {
		return activationService.activate(form);
	}
	
	@PostMapping("signin")
	AuthResult signIn(@Validated @RequestBody SignInForm form) {
		return tokenService.signIn(form);
	}
	
	@PostMapping("refresh")
	AuthResult refreshToken(@Validated @RequestBody TokenForm form) {
		return tokenService.refresh(form);
	}
}

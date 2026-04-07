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
import com.jdc.portal.dto.MessageResult;

@RestController
@RequestMapping("/anonymous/auth")
public class AuthApi {

	@PostMapping("activate")
	MessageResult activate(@Validated @RequestBody ActivationForm form) {
		return null;
	}
	
	@PostMapping("signin")
	AuthResult signIn(@Validated @RequestBody SignInForm form) {
		return null;
	}
	
	@PostMapping("refresh")
	AuthResult refreshToken(@Validated @RequestBody TokenForm form) {
		return null;
	}
}

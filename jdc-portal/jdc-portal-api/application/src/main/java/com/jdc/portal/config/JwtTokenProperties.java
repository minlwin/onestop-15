package com.jdc.portal.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import lombok.Data;

@Data
@Component
@ConfigurationProperties(prefix = "app.jwt")
public class JwtTokenProperties {

	private String issuer;
	private int accessLife;
	private int refreshLife;
}

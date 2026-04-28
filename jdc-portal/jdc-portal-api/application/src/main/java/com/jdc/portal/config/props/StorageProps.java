package com.jdc.portal.config.props;

import org.springframework.boot.context.properties.ConfigurationProperties;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ConfigurationProperties(prefix = "app.storage")
public class StorageProps {

	private String path;
}

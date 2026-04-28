package com.jdc.portal.config;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.jackson.autoconfigure.JsonMapperBuilderCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import tools.jackson.databind.ext.javatime.deser.LocalDateDeserializer;
import tools.jackson.databind.ext.javatime.deser.LocalDateTimeDeserializer;
import tools.jackson.databind.ext.javatime.ser.LocalDateSerializer;
import tools.jackson.databind.ext.javatime.ser.LocalDateTimeSerializer;
import tools.jackson.databind.module.SimpleModule;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

	@Value("${spring.mvc.format.date}")
	private String dateFormat;
	@Value("${spring.mvc.format.date-time}")
	private String dateTimeFormat;
	
	@Value("${app.storage.path}")
	private String storage;

	@Bean
	JsonMapperBuilderCustomizer jsonMapperBuilderCustomizer() {
		return builder -> {
			var dateTimeModule = new SimpleModule();
			
			var dateFormatter = DateTimeFormatter.ofPattern(dateFormat);
			var dateTimeFormatter = DateTimeFormatter.ofPattern(dateTimeFormat);
			
			dateTimeModule.addSerializer(LocalDate.class, new LocalDateSerializer(dateFormatter));
			dateTimeModule.addSerializer(LocalDateTime.class, new LocalDateTimeSerializer(dateTimeFormatter));
			
			dateTimeModule.addDeserializer(LocalDate.class, new LocalDateDeserializer(dateFormatter));
			dateTimeModule.addDeserializer(LocalDateTime.class, new LocalDateTimeDeserializer(dateTimeFormatter));
			
			builder.addModule(dateTimeModule);
		};
	}
	
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry.addResourceHandler("/storage/**").addResourceLocations("file:%s".formatted(storage));
	}
	
}

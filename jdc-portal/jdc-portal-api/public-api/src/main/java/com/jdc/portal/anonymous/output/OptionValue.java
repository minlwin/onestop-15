package com.jdc.portal.anonymous.output;

import com.jdc.portal.domains.utils.dto.Option;

public record OptionValue(String label, String value) {
	
	public static OptionValue from(Option option) {
		return new OptionValue(option.getLabel(), option.getValue());
	}
}

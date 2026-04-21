package com.jdc.portal.commons.utils;

import java.util.Optional;

import com.jdc.portal.commons.JdcBusinessException;

public class NullSafetyUtils {

	public static <T> T safeCall(Optional<T> optional, String resource, String identity) {
		return optional.orElseThrow(() -> new JdcBusinessException(
				"There is no %s with %s".formatted(resource, identity)));
	}
}

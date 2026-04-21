package com.jdc.portal.commons.utils;

public class ActivationCodeGenerator {

	public static String generateCode() {
		String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
		StringBuilder code = new StringBuilder();
		for (int i = 0; i < 8; i++) {
			int index = (int) (Math.random() * chars.length());
			code.append(chars.charAt(index));
		}
		return code.toString();
	}
}

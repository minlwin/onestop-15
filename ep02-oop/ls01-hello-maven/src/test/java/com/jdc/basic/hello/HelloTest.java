package com.jdc.basic.hello;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

public class HelloTest {

	@ParameterizedTest
	@CsvSource(value = { 
		"0,true", 
		"1,false"
	})
	void test_isEvan(int input, boolean expected) {
		// Check Result
		assertEquals(expected, Hello.isEven(input));
	}
}

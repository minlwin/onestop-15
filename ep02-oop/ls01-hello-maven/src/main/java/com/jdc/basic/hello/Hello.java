package com.jdc.basic.hello;

public class Hello {

	public static boolean isEven(int data) {
		var result =  data % 2;
		
		if(result == 0) {
			return true;
		}
		
		return false;
	}

}

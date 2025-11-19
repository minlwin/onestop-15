package com.jdc.basic.reuse.inheritance;

public class Car extends Vehicle {

	public Car() {
		super("Car");
	}
	
	protected Car(String name) {
		super(name);
	}

	public void horn() {
		System.out.println("PP");
	}
}

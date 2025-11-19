package com.jdc.basic.reuse.inheritance;

public class Vehicle {

	private final String name;

	public Vehicle(String name) {
		super();
		this.name = name;
	}

	public void drive() {
		System.out.println("%s is driving.".formatted(name));
	}
}

package com.jdc.abstraction;

public class Bird extends Animal{

	public Bird() {
		super("Bird");
	}
	
	@Override
	public void eat() {
		System.out.println("Bird Is Eating");
	}
}

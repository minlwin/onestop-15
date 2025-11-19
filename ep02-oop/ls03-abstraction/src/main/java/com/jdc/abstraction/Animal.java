package com.jdc.abstraction;

public abstract class Animal {

	private final String type;
	
	protected Animal(String type) {
		this.type = type;
	}

	public String getType() {
		return type;
	}
	
	public abstract void eat();
}

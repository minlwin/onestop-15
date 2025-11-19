package com.jdc.abstraction;

public interface Swimable {

	void swim();

	int MAX_ITEM = 100;
	
	
	public default void doSomething() {
		// Default Method
		doPrivate();
	}
	
	public default void doOtherTHing() {
		// Default Method
		doPrivate();
	}
	

	public static Swimable generate() {
		// Static
		return null;
	}
	
	private void doPrivate() {
		// Private
	}
}

package com.jdc.abstraction;

import org.junit.jupiter.api.Test;

public class AbstractClassTest {

	@Test
	void test_creation() {
		
		// Create Object by Their Sub Classes 
		Animal a1 = new Bird();

		// Create Object by Anonymous Inner Class 
		Animal a2 = new Animal("Test") {

			@Override
			public void eat() {
				System.out.println("Test Eating");
			}
		};
		
		a1.eat();
		a2.eat();
		
	}
	
	@Test
	void test_encapsulation() {
		
		Duck duck = new Duck();
		duck.doOtherTHing();
		duck.doSomething();
		duck.eat();
		duck.fly();
		duck.getType();
		duck.swim();
		
		Flyable flyableDuck = duck;
		flyableDuck.fly();
	}
}

package com.jdc.basic.reuse.inheritance.sports;

import com.jdc.basic.reuse.inheritance.Car;

public final class RacingCar extends Car {

	public RacingCar() {
		super("Racing Car");
	}
	
	@Override
	public void horn() {
		System.out.println("Teee");
	}
}

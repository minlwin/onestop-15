package com.jdc.basic.reuse.inheritance;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;

import com.jdc.basic.reuse.inheritance.sports.RacingCar;

public class VehicleTest {

	@Test
	@Disabled
	void test_inheritance() {
		Vehicle vehicle = new Vehicle("General Mortor");
		run(vehicle);
		
		Car car = new Car();
		run(car);
		
		Vehicle vCar = car;
		
		if(vCar instanceof Car c) {
			c.horn();
		}
		
		if(vehicle instanceof Car c) {
			c.horn();
			c.drive();
		}
	}
	
	void run(Vehicle vehicle) {
		vehicle.drive();
	}
	
	@Test
	void test_visibility() {
		RacingCar car = new RacingCar();
		horn(car);
	}
	
	void horn(Car car) {
		car.horn();
	}
}

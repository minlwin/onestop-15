package com.jdc.students.model;

import java.time.LocalDate;
import java.time.Period;

public record Student(
		int id,
		String name,
		String phone,
		LocalDate dob) {

	public int getAge() {
		return Period.between(dob, LocalDate.now()).getYears();
	}
	
	public Student withId(int id) {
		return new Student(id, this.name, this.phone, this.dob);
	}

	public static Builder builder() {
		return new Builder();
	}
	
	public static class Builder {
		private int id;
		private String name;
		private String phone;
		private LocalDate dob;
		
		public Builder id(int id) {
			this.id = id;
			return this;
		}
		
		public Builder name(String name) {
			this.name = name;
			return this;
		}

		public Builder phone(String phone) {
			this.phone = phone;
			return this;
		}

		public Builder dob(LocalDate dob) {
			this.dob = dob;
			return this;
		}

		public Student build() {
			return new Student(id, name, phone, dob);
		}
	}

}

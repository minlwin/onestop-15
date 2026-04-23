package com.jdc.portal.office.input;

import java.time.LocalDate;

import com.jdc.portal.domains.account.Employee;
import com.jdc.portal.domains.utils.consts.Position;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record EmployeeForm(
	@NotNull(message = "Please select a position")
    Position position,
    @NotBlank(message = "Please enter your name")
    String name,
    @Email(message = "Please enter a valid email address")
    @NotBlank(message = "Please enter your email")
    String email,
    @NotBlank(message = "Please enter your phone number")
    String phone,
    @NotNull(message = "Please enter your entry date")
    LocalDate entryAt,
    boolean wasAStudent
) {

	public Employee toEntity() {
		
		var employee = new Employee();
		employee.setPosition(position);
		employee.setPhone(phone);
		employee.setEntryAt(entryAt);
		
		return employee;
	}
}

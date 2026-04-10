package com.jdc.portal.office.input;

import java.time.LocalDate;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record EmployeeForm(
	@NotBlank(message = "Please select a position")
    String position,

    @NotBlank(message = "Please enter your name")
    String name,

    @Email(message = "Please enter a valid email address")
    @NotBlank(message = "Please enter your email")
    String email,

    @NotBlank(message = "Please enter your phone number")
    String phone,

    @NotBlank(message = "Please enter your entry date")
    LocalDate entryAt		
) {}

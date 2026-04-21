package com.jdc.portal.office.input;

import java.time.LocalDate;

import com.jdc.portal.domains.master.Classes;
import com.jdc.portal.utils.consts.ClassType;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

public record ClassForm(
		@NotNull(message = "Please select a class type")
	    ClassType type,

	    @NotNull(message = "Please select a course")
	    Integer course,

	    @NotNull(message = "Please select a start date")
	    LocalDate startDate,

	    @NotNull(message = "Please enter a valid number")
	    @PositiveOrZero(message = "Please enter a valid number")
	    Integer months,

	    @NotEmpty(message = "Please select at least one day")
	    String[] days,

	    @NotBlank(message = "Please select a start time")
	    String timeFrom,

	    @NotBlank(message = "Please select an end time")
	    String timeTo,

	    @NotNull(message = "Please enter a valid number")
	    @PositiveOrZero(message = "Please enter a valid number")
	    Integer registrationFee,

	    @NotNull(message = "Please enter a valid number")
	    @PositiveOrZero(message = "Please enter a valid number")
		Integer monthlyFee) {
	
	
	public static ClassForm from(Classes entity) {
		return new ClassForm(
				entity.getType(),
				entity.getCourse().getId(),
				entity.getStartDate(),
				entity.getMonths(),
				entity.getDays(),
				entity.getTimeFrom(),
				entity.getTimeTo(),
				entity.getRegistrationFee(),
				entity.getMonthlyFee()
		);
	}

	public Classes toEntity() {
		
		var entity = new Classes();
		entity.setType(type);
		entity.setStartDate(startDate);
		entity.setMonths(months);
		entity.setDays(days);
		entity.setTimeFrom(timeFrom);
		entity.setTimeTo(timeTo);
		entity.setRegistrationFee(registrationFee);
		entity.setMonthlyFee(monthlyFee);
		
		return entity;
	}

	public void updateEntity(Classes entity) {
		entity.setType(type);
		entity.setStartDate(startDate);
		entity.setMonths(months);
		entity.setDays(days);
		entity.setTimeFrom(timeFrom);
		entity.setTimeTo(timeTo);
		entity.setRegistrationFee(registrationFee);
		entity.setMonthlyFee(monthlyFee);
	}

}

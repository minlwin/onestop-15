package com.jdc.portal.office.input;

import java.time.LocalDate;
import java.util.List;

import com.jdc.portal.dto.consts.ClassType;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

public record ClassForm(
		@NotNull(message = "Please select a class type")
	    ClassType type,

	    @NotBlank(message = "Please select a course")
	    String course,

	    @NotNull(message = "Please select a start date")
	    LocalDate startDate,

	    @NotNull(message = "Please enter a valid number")
	    @PositiveOrZero(message = "Please enter a valid number")
	    Integer months,

	    @NotEmpty(message = "Please select at least one day")
	    List<@NotBlank(message = "Day cannot be blank") String> days,

	    @NotBlank(message = "Please select a start time")
	    String timeFrom,

	    @NotBlank(message = "Please select an end time")
	    String timeTo,

	    @NotNull(message = "Please enter a valid number")
	    @PositiveOrZero(message = "Please enter a valid number")
	    Double registrationFee,

	    @NotNull(message = "Please enter a valid number")
	    @PositiveOrZero(message = "Please enter a valid number")
	    Double monthlyFee) {

}

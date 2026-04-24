package com.jdc.portal.anonymous;

import java.util.Arrays;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jdc.portal.anonymous.output.OptionValue;
import com.jdc.portal.domains.utils.consts.AttendanceStatus;
import com.jdc.portal.domains.utils.consts.ClassType;
import com.jdc.portal.domains.utils.consts.CourseLevel;
import com.jdc.portal.domains.utils.consts.FeeType;
import com.jdc.portal.domains.utils.consts.PaymentStatus;
import com.jdc.portal.domains.utils.consts.PaymentType;
import com.jdc.portal.domains.utils.consts.Position;
import com.jdc.portal.domains.utils.consts.RegistrationStatus;
import com.jdc.portal.domains.utils.dto.Option;

@RestController
@RequestMapping("/anonymous/options")
public class CommonOptionsApi {
	
	@GetMapping("attendance-status")
	List<OptionValue> getAttendanceStatus() {
		return from(AttendanceStatus.values());
	}

	@GetMapping("class-types")
	List<OptionValue> getClassTypes() {
		return from(ClassType.values());
	}

	@GetMapping("course-levels")
	List<OptionValue> getCourseLevels() {
		return from(CourseLevel.values());
	}

	@GetMapping("fee-types")
	List<OptionValue> getFeeTypes() {
		return from(FeeType.values());
	}


	@GetMapping("payment-status")
	List<OptionValue> getPaymentStatus() {
		return from(PaymentStatus.values());
	}

	@GetMapping("payment-types")
	List<OptionValue> getPaymentTypes() {
		return from(PaymentType.values());
	}
	
	
	@GetMapping("registration-status")
	List<OptionValue> getRegistrationStatus() {
		return from(RegistrationStatus.values());
	}
	
	@GetMapping("positions")
	List<OptionValue> getPositions() {
		return from(Position.values());
	}
	
	private List<OptionValue> from(Option [] array) {
		return Arrays.stream(array)
				.map(OptionValue::from)
				.toList();
	}
}

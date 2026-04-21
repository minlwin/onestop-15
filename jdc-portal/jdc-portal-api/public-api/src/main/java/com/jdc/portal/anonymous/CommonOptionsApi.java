package com.jdc.portal.anonymous;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
	Option[] getAttendanceStatus() {
		return AttendanceStatus.values();
	}

	@GetMapping("class-types")
	Option[] getClassTypes() {
		return ClassType.values();
	}

	@GetMapping("course-levels")
	Option[] getCourseLevels() {
		return CourseLevel.values();
	}

	@GetMapping("fee-types")
	Option[] getFeeTypes() {
		return FeeType.values();
	}


	@GetMapping("payment-status")
	Option[] getPaymentStatus() {
		return PaymentStatus.values();
	}

	@GetMapping("payment-types")
	Option[] getPaymentTypes() {
		return PaymentType.values();
	}
	
	
	@GetMapping("registration-status")
	Option[] getRegistrationStatus() {
		return RegistrationStatus.values();
	}
	
	@GetMapping("positions")
	Option[] getPositions() {
		return Position.values();
	}
}

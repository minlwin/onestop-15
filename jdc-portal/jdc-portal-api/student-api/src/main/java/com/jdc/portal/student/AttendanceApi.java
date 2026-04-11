package com.jdc.portal.student;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jdc.portal.student.output.AttendanceItem;
import com.jdc.portal.student.service.StudentAttendanceService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/student/attendances")
public class AttendanceApi {
	
	private final StudentAttendanceService service;

	@GetMapping("{classId}")
	List<AttendanceItem> search(@PathVariable int classId, Authentication auth) {
		return service.search(classId, auth.getName());
	}
}

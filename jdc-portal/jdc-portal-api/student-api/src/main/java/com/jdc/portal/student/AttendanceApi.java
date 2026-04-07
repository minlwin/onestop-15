package com.jdc.portal.student;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jdc.portal.student.output.AttendanceItem;

@RestController
@RequestMapping("/student/attendances")
public class AttendanceApi {

	@GetMapping("{classId}")
	List<AttendanceItem> search(@PathVariable int classId, Authentication auth) {
		return null;
	}
}

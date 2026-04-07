package com.jdc.portal.student;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jdc.portal.student.output.AttendClassSummary;
import com.jdc.portal.student.output.ClassItem;

@RestController
@RequestMapping("/student/classes")
public class ClassApi {

	@GetMapping
	List<ClassItem> findMyClasses(Authentication auth) {
		return null;
	}
	
	@GetMapping("available")
	List<ClassItem> findAvailableClasses(Authentication auth) {
		return null;
	}
	
	@GetMapping("{classId}/summary")
	AttendClassSummary findSummary(@PathVariable int classId, Authentication auth) {
		return null;
	}
}

package com.jdc.portal.student;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jdc.portal.student.output.AttendClassSummary;
import com.jdc.portal.student.output.ClassItem;
import com.jdc.portal.student.service.StudentClassService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController("studentClassesApi")
@RequestMapping("/student/classes")
public class ClassesApi {
	
	private final StudentClassService service;

	@GetMapping
	List<ClassItem> findMyClasses(Authentication auth) {
		return service.findClass(auth, true);
	}
	
	@GetMapping("available")
	List<ClassItem> findAvailableClasses(Authentication auth) {
		return service.findClass(auth, false);
	}
	
	@GetMapping("{classId}/summary")
	AttendClassSummary findSummary(@PathVariable int classId, Authentication auth) {
		return service.findSummary(classId, auth);
	}
}

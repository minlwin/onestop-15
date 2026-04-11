package com.jdc.portal.anonymous;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jdc.portal.anonymous.output.ClassDetails;
import com.jdc.portal.anonymous.output.ClassInfo;
import com.jdc.portal.anonymous.service.ClassInfoService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController("publicClassesApi")
@RequestMapping("/anonymous/classes")
public class ClassesApi {
	
	private final ClassInfoService service;
	
	@GetMapping
	List<ClassInfo> findForCourse(@RequestParam int courseId) {
		return service.findForCourse(courseId);
	}

	@GetMapping("{id}")
	ClassDetails findById(@PathVariable int id) {
		return service.findById(id);
	}
}

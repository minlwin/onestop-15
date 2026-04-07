package com.jdc.portal.anonymous;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jdc.portal.anonymous.output.ClassDetails;

@RestController
@RequestMapping("/anonymous/classes")
public class ClassesApi {

	@GetMapping("{id}")
	ClassDetails findById(@PathVariable int id) {
		return null;
	}
}

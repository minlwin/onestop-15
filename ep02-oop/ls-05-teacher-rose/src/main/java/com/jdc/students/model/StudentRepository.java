package com.jdc.students.model;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class StudentRepository {

	private int currentId;
	private Map<Integer, Student> students;
	
	private static StudentRepository instance;
	
	private StudentRepository() {
		students = new HashMap<>();
	}
	
	public static StudentRepository getInstance() {
		
		if(null == instance) {
			instance = new StudentRepository();
		}
		
		return instance;
	}
	
	public List<Student> getAll() {
		var list = new ArrayList<>(students.values());
		Collections.sort(list, (o1, o2) -> o1.id() - o2.id());
		return list;
	}
	
	public Student create(Student student) {
		var created = student.withId(++ currentId);
		students.put(created.id(), created);
		return created;
	}
	
	public Student findById(int id) {
		return students.get(id);
	}
}

package com.jdc.students;

import java.util.List;

import com.jdc.consoleapp.Application;
import com.jdc.consoleapp.Operation;
import com.jdc.students.operations.CreateStudentOperation;
import com.jdc.students.operations.FindStudentByIdOperation;
import com.jdc.students.operations.ShowAllStudentOperation;

public class StudentManagementSystem {

	public static void main(String[] args) {
		var application = new Application("Student Management System", getOperations());
		application.start();
	}

	private static List<Operation> getOperations() {
		return List.of(
			new ShowAllStudentOperation(1),
			new FindStudentByIdOperation(2),
			new CreateStudentOperation(3)
		);
	}
}

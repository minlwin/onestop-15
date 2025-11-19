package com.jdc.consoleapp;

import java.util.List;

public class Application {

	private final String name;
	private final List<Operation> operations;
	
	public Application(String name, List<Operation> operations) {
		super();
		this.name = name;
		this.operations = operations;
	}

	public void start() {

		showTitle("Welcome to %s".formatted(name));
		
		do {	
			Operation operation = getOperation();
			
			operation.doBusiness();
			
		} while(askToContinue());
		
		showTitle("Thank You!");
	}

	private Operation getOperation() {
		
		System.out.println("Please select operation id.");
		
		for(Operation operation : operations) {
			System.out.println("%d: %s".formatted(operation.getId(), operation.getName()));
		}
		
		System.out.println();
		
		String operationId = IO.readln("Operation ID : ");
		
		for(Operation operation : operations) {
			if(operationId.equals(String.valueOf(operation.getId()))) {
				return operation;
			}
		}
		
		return null;
	}

	private boolean askToContinue() {
		return "y".equalsIgnoreCase(IO.readln("Do you want to continue? (y / Other) : "));
	}

	private void showTitle(String message) {
		System.out.println("""
				====================================
				%s
				====================================
				""".formatted(message));
	}
}

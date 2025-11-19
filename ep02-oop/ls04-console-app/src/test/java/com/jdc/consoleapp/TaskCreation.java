package com.jdc.consoleapp;

public class TaskCreation extends TodoOperation{

	public TaskCreation(TaskManager tm) {
		super(1, "Create Task", tm);
	}
	
	@Override
	public void doBusiness() {
		showTItle();
		
		String task = IO.readln("Task Name : ");
		taskManager.addNew(task);
	}

}

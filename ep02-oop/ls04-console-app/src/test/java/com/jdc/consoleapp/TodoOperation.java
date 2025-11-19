package com.jdc.consoleapp;

public abstract class TodoOperation extends AbstractOperation {
	
	protected TaskManager taskManager;

	protected TodoOperation(int id, String name, TaskManager taskManager) {
		super(id, name);
		this.taskManager = taskManager;
	}

}

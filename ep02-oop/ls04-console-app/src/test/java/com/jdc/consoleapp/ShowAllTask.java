package com.jdc.consoleapp;

public class ShowAllTask extends TodoOperation {

	public ShowAllTask(TaskManager tm) {
		super(2, "Show All Tasks", tm);
	}
	
	@Override
	public void doBusiness() {
		showTItle();
		
		var tasks = taskManager.getAllTask();
		
		for(var i = 0; i < tasks.size(); i ++) {
			System.out.println("%d. %s".formatted(i + 1, tasks.get(i)));
		}
	}

}

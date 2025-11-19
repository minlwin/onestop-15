package com.jdc.consoleapp;

import java.util.List;

import org.junit.jupiter.api.Test;

public class ApplicationTest {

	@Test
	void test() {
		
		var tm = new TaskManager();
		
		var application = new Application("TODO Application", 
				List.of(
				new TaskCreation(tm),
				new ShowAllTask(tm)));
		
		application.start();
	}
}

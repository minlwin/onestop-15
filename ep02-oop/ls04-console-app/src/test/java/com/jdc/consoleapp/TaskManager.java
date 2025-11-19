package com.jdc.consoleapp;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public class TaskManager {

	private int id;
	private Map<Integer, String> tasks = new LinkedHashMap<>();

	public List<String> getAllTask() {
		return new ArrayList<>(tasks.values());
	}

	public void addNew(String task) {
		tasks.put(++ id, task);
	}
}

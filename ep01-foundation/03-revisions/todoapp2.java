void main() {

	String [] tasks = {};

	showMessage("TODO Application");

	loop:
	while(true) {

		switch(getOperationId()) {
			case "1" -> {
				showAll(tasks);
			}
			case "2" -> {
				tasks = createNew(tasks);
			} 
			case "3" -> {
				search(tasks);
			} 
			default -> {
				break loop;
			} 
		}
	}

	showMessage("Thank You");		

}

void showMessage(String message) {
	IO.println("""
		=======================
		%s	
		=======================
		""".formatted(message));		
}

String getOperationId() {
	IO.println("""
		Operations : 
		1. Show All
		2. Create New
		3. Search
		""");

	return IO.readln("Selected ID : ");
}

void showAll(String [] tasks) {
	IO.println("1. Show All");
	IO.println("-----------------------");

	if(tasks.length > 0) {
		for(int i = 0; i < tasks.length; i ++) {
			IO.println("%d. %s".formatted(i + 1, tasks[i]));
		}
	} else {
		IO.println("There is no tasks.");
	}

	IO.println("-----------------------\n");
}

String [] createNew(String [] tasks) {
	IO.println("2. Create New");
	IO.println("-----------------------");
	String task = IO.readln("Task Name : ");

	tasks = Arrays.copyOf(tasks, tasks.length + 1);
	tasks[tasks.length - 1] = task;

	IO.println("You have to do %s %s.".formatted(
		tasks.length, 
		tasks.length > 1 ? "tasks" : "task")
	);
	IO.println("-----------------------\n");

	return tasks;	
}

void search(String [] tasks) {
	IO.println("3. Search");
	IO.println("-----------------------");
	String keyword = IO.readln("Keyword : ");
	
	int no = 0;
	for(String task : tasks) {
		if(task.toLowerCase().startsWith(keyword.toLowerCase())) {
			IO.println("%d. %s".formatted(++ no, task));
		}
	}

	if(no == 0) {
		IO.println("There is no task for this keyword.");
	}	
	IO.println("-----------------------\n");
}
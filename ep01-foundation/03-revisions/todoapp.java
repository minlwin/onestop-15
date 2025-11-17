void main() {

	String [] tasks = {};

	IO.println("""
		=======================
		TODO Application	
		=======================
		""");

	loop:
	while(true) {

		IO.println("""
			Operations : 
			1. Show All
			2. Create New
			3. Search
			""");

		String operationId = IO.readln("Selected ID : ");

		switch(operationId) {
			case "1" -> {
				IO.println("1. Show All");
				IO.println("-----------------------");

				if(tasks.length > 0) {
					for(int i = 0; i < tasks.length; i ++) {
						IO.println("%d. %s".formatted(i + 1, tasks[i]));
					}
				} else {
					IO.println("There is no tasks.");
				}
			}
			case "2" -> {
				IO.println("2. Create New");
				IO.println("-----------------------");
				String task = IO.readln("Task Name : ");

				tasks = Arrays.copyOf(tasks, tasks.length + 1);
				tasks[tasks.length - 1] = task;

				IO.println("You have to do %s %s.".formatted(
					tasks.length, 
					tasks.length > 1 ? "tasks" : "task")
				);
			} 
			case "3" -> {
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
			} 
			default -> {
				break loop;
			} 
		}

		IO.println("-----------------------\n");
	}

	IO.println("""
		=======================
		Thank You	
		=======================
		""");		

}
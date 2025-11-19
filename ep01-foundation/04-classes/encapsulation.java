class TaskManager {
	private List<String> tasks;

	{
		tasks = new ArrayList<>();
	}

	public void add(String task) {
		tasks.add(task);
	}

	public List<String> getAllTasks() {
		return new ArrayList<>(tasks);
	}
}
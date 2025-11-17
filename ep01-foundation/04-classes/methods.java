class Student {
	String name;
	int age;

	static int count;

	{
		count ++;
	}

	void greet() {
		IO.println("Hello! I am %s and %d years old.".formatted(name, age));
	}

	void greet(String friend) {
		IO.println("Hi! %s.".formatted(friend));
		IO.println("I am %s and %d years old.".formatted(name, age));
	}

	static void showStudentCounts() {
		IO.println("There are %d students.".formatted(count));
	}
}
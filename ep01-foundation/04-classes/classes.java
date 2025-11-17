class Student {

	static int count;

	String name;
	int age;

	{
		IO.println("Instance Block");
	}

	static {
		IO.println("Static Block");
	}

	Student(String name, int age) {
		this();
		this.name = name;
		this.age = age;
		IO.println("Constructor with name & age");
	}

	Student(String name) {
		this();
		this.name = name;
		IO.println("Constructor with name");
	}

	Student(int age) {
		this();
		this.age = age;
		IO.println("Constructor with age");
	}

	Student() {
		count ++;
		IO.println("Count of student is %d.".formatted(count));
		IO.println("Default Constructor");
	}
}
void addElement(String [] array, String element) {
	array = Arrays.copyOf(array, array.length + 1);
	array[array.length - 1] = element;
	IO.println(Arrays.toString(array));
}

void main() {
	String [] array = {"Hello"};

	addElement(array, "Java");

	IO.println(Arrays.toString(array));
}
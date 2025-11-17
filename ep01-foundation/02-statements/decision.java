void main() {

	String input = IO.readln("Mark : ");

	int mark = Integer.parseInt(input);

	if(mark >= 0 && mark < 40) {
		IO.println("Fails");
	} else if (mark >= 40 && mark < 80) {
		IO.println("Pass");
	} else if (mark >= 80 && mark <= 100) {
		IO.println("Excellant");
	} else {
		IO.println("Impossible");
	}
}
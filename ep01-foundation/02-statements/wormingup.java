void main() {
	IO.println("Welcome!");

	String name = IO.readln("Name  : ");
	String phone = IO.readln("Phone : ");

	IO.println("Your name is %s.%nYour phone is %s.".formatted(name, phone));
}
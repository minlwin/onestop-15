void main() {

	do {
		String input = IO.readln("Green, Yellow or Red : ");

		String result = switch(input) {
		case "Green" ->	"You can go!";
		case "Yellow" -> "Plase wait!";
		case "Red" -> "Plase Stop!";
		default -> "Plase select Green, Yellow or Red!";
		};

		IO.println(result);
	} while("Yes".equals(IO.readln("Do you want to continue? : ")));

}
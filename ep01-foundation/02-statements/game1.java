import java.util.concurrent.ThreadLocalRandom;

void main() {

	String [] items = {"Captain", "Tiger", "Gun"};
	ThreadLocalRandom random = ThreadLocalRandom.current();

	do {

		// Show Items
		IO.println("Game Items");
		for(int i = 0; i < items.length; i ++) {
			IO.println("%d. %s".formatted(i + 1, items[i]));
		}

		IO.println();

		// Get User Selected Item
		String input = IO.readln("Please select one : ");
		int index = Integer.parseInt(input) - 1;

		String userSelected = items[index];
		IO.println();

		// Generate by system
		int systemIndex = random.nextInt(3);
		String systemSelected = items[systemIndex];

		IO.println("You    : %s".formatted(userSelected));
		IO.println("System : %s".formatted(systemSelected));

		// Make Dicision
		if(userSelected.equals(systemSelected)) {
			IO.println("Draw!");
		} else if ((userSelected.equals("Captain") && systemSelected.equals("Gun"))
			|| (userSelected.equals("Tiger") && systemSelected.equals("Captain")) 
			|| (userSelected.equals("Gun") && systemSelected.equals("Tiger"))) {
			IO.println("You win!");
		} else {
			IO.println("You loose!");
		}

		IO.println();
	} while ("Yes".equalsIgnoreCase(IO.readln("Do you want to play again ? ")));

}
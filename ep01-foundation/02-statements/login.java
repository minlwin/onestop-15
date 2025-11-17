record User(String name, String loginId, String password) {}

void main() {
	User [] users = {
		new User("Aung Aung", "aung", "aung"),
		new User("Maung Maung", "maung", "maung"),
		new User("Thidar", "thidar", "thidar")
	};

	IO.println("Welcome!");

	String loginId = IO.readln("Login ID : ");
	String password = IO.readln("Password : ");

	User loginUser = null;

	for(User user : users) {
		if(user.loginId().equals(loginId) 
			&& user.password().equals(password)) {
			loginUser = user;
			break;
		}	
	}

	(null != loginUser) ? 
		IO.println("Hello %s".formatted(loginUser.name())) 
		: IO.println("Please check your login information.");
}
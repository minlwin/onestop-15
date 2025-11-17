void plus2AndPrint(int data) {
	data = data + 2;
	IO.println(data);
}

class Data {
	int value;
}

void plus2AndPrint(Data data) {
	data.value = data.value + 2;
	IO.println(data.value);
}

void main() {
	Data data = new Data();
	data.value = 10;

	plus2AndPrint(data);

	IO.println(data.value);
}
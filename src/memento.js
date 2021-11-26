class Memento {
	constructor(value) {
		this.value = value;
	}
}

class Caretaker {
	constructor() {
		this.values = [];
	}

	addSnapshot(snapshot) {
		this.values.push(new Memento(snapshot));
	}

	restoreSnapshot() {
		return this.values.pop();
	}
}

module.exports = { Memento, Caretaker };

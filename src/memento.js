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

	restoreSnapshot(idx) {
		return this.values[idx].value;
	}
}

module.exports = { Memento, Caretaker };

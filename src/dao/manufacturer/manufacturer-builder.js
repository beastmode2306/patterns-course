const Manufacturer = require("./manufacturer");

class ManufacturerBuilder {
	constructor() {
		this.name = null;
	}
	addName(name) {
		this.name = name;
		return this;
	}
	build() {
		if (!this.name) {
			throw new Error("Not all fields are provided");
		} else {
			return new Manufacturer(this.name);
		}
	}
}

module.exports = ManufacturerBuilder;

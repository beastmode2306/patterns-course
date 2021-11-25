const Type = require("./type");

class TypeBuilder {
    constructor() {
        this.name = null
    }
    addName(name) {
        this.name = name
        return this
    }
    build() {
        if (!this.name) {
            throw new Error("Not all fields are provided")
        }
        else {
            return new Type(this.name)
        }
    }
}

module.exports = TypeBuilder
const Matrix = require("./matrix");

class MatrixBuilder {
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
            return new Matrix(this.name)
        }
    }
}

module.exports = MatrixBuilder
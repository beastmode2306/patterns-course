const Phone = require("./phone");

class PhoneBuilder {
    constructor() {
        this.model = null
        this.ram = null
        this.hard = null
        this.diagonal = null
        this.matrix = null
        this.type = null
        this.manufacturer = null
    }

    addModel(model) {
        this.model = model
        return this
    }
    addRam(ram) {
        this.ram = ram
        return this
    }
    addHard(hard) {
        this.hard = hard
        return this
    }
    addDiagonal(diagonal) {
        this.diagonal = diagonal
        return this
    }
    addMatrix(matrixEntity) {
        this.matrix = matrixEntity.name
        return this
    }
    addType(typeEntity) {
        this.type = typeEntity.name
        return this
    }
    addManufacturer(manufacturerEntity) {
        this.manufacturer = manufacturerEntity.name
        return this
    }
    build() {
        if (
            [this.model, this.ram, this.hard, this.diagonal, this.matrix, this.type, this.manufacturer]
                .some(elem => elem === null)
        ) {
            throw new Error("Not all fields are provided")
        }
        else {
            return new Phone(this.model, this.ram, this.hard, this.diagonal, this.matrix, this.type, this.manufacturer)
        }
    }
}

module.exports = PhoneBuilder
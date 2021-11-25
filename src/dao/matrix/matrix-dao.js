class MatrixDao {
    constructor(pool) {
        this.pool = pool
    }

    async find(id) {
        const results = await this.pool.execute(
            'SELECT * FROM `matrix` WHERE id = ?',
            [id]
        )

        return results[0][0]
    }

    async findWithName(name) {
        const results = await this.pool.execute(
            'SELECT * FROM `matrix` WHERE name = ?',
            [name]
        )

        return results[0][0]
    }

    async findAll() {
        const results = await this.pool.query(
            'SELECT * FROM `matrix`'
        )

        return results[0]
    }

    async delete(id) {
        const results = await this.pool.execute(
            'DELETE FROM `matrix` WHERE id = ?',
            [id]
        )

        return results[0][0]
    }

    async insert(matrix) {
        const results = await this.pool.execute(
            'INSERT INTO `matrix` (`name`) VALUES (?)',
            [matrix.name]
        )
        return results[0][0]
    }
}

module.exports = MatrixDao
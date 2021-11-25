class TypeDao {
    constructor(pool) {
        this.pool = pool
    }

    async find(id) {
        const results = await this.pool.execute(
            'SELECT * FROM `type` WHERE id = ?',
            [id]
        )

        return results[0][0]
    }

    async findWithName(name) {
        const results = await this.pool.execute(
            'SELECT * FROM `type` WHERE name = ?',
            [name]
        )

        return results[0][0]
    }

    async findAll() {
        const results = await this.pool.query(
            'SELECT * FROM `type`'
        )

        return results[0]
    }

    async delete(id) {
        const results = await this.pool.execute(
            'DELETE FROM `type` WHERE id = ?',
            [id]
        )

        return results[0][0]
    }

    async insert(type) {
        const results = await this.pool.execute(
            'INSERT INTO `type` (`name`) VALUES (?)',
            [type.name]
        )
        return results[0][0]
    }
}

module.exports = TypeDao
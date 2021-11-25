class ManufacturerDao {
    constructor(pool) {
        this.pool = pool
    }

    async find(id) {
        const results = await this.pool.execute(
            'SELECT * FROM `manufacturer` WHERE id = ?',
            [id]
        )

        return results[0][0]
    }

    async findWithName(name) {
        const results = await this.pool.execute(
            'SELECT * FROM `manufacturer` WHERE name = ?',
            [name]
        )

        return results[0][0]
    }

    async findAll() {
        const results = await this.pool.query(
            'SELECT * FROM `manufacturer`'
        )

        return results[0]
    }

    async delete(id) {
        const results = await this.pool.execute(
            'DELETE FROM `manufacturer` WHERE id = ?',
            [id]
        )

        return results[0][0]
    }

    async insert(manufacturer) {
        const results = await this.pool.execute(
            'INSERT INTO `manufacturer` (`name`) VALUES (?)',
            [manufacturer.name]
        )
        return results[0][0]
    }
}

module.exports = ManufacturerDao
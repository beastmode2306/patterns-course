const TypeDao = require("../type/type-dao");
const MatrixDao = require("../matrix/matrix-dao");
const ManufacturerDao = require("../manufacturer/manufacturer-dao");

class PhoneDao {
	constructor(pool) {
		this.pool = pool;
	}

	async find(id) {
		const results = await this.pool.execute(
			"SELECT * FROM `phone` WHERE id = ?",
			[id]
		);

		return results[0][0];
	}

	async findAll() {
		const results = await this.pool.query("SELECT * FROM `phone`");

		return results[0];
	}

	async delete(id) {
		const results = await this.pool.execute(
			"DELETE FROM `phone` WHERE id = ?",
			[id]
		);

		return results[0][0];
	}

	async insert(phone) {
		const [typeEntity, manufacturerEntity, matrixEntity] = await Promise.all([
			new TypeDao(this.pool).findWithName(phone.type),
			new ManufacturerDao(this.pool).findWithName(phone.manufacturer),
			new MatrixDao(this.pool).findWithName(phone.matrix),
		]);
		const results = await this.pool.execute(
			"INSERT INTO `phone` (`model`, `ram`, `hard`, `diagonal`, `matrix_id`, `type_id`, `manufacturer_id`) VALUES (?, ?, ?, ?, ?, ?, ?)",
			[
				phone.model,
				phone.ram,
				phone.hard,
				phone.diagonal,
				matrixEntity.id,
				typeEntity.id,
				manufacturerEntity.id,
			]
		);
		return results[0][0];
	}
}

module.exports = PhoneDao;

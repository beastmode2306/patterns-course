const TypeDao = require("../type/type-dao");
const MatrixDao = require("../matrix/matrix-dao");
const ManufacturerDao = require("../manufacturer/manufacturer-dao");
const EventObserver = require("../../event-observer");

class PhoneDao {
	constructor(pool) {
		this.pool = pool;
		this.eo = new EventObserver();
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
		this.eo.emit("phoneFound", [results[0]]);
		return results[0];
	}

	async update(id, phone) {
		const [typeEntity, manufacturerEntity, matrixEntity] = await Promise.all([
			new TypeDao(this.pool).findWithName(phone.type),
			new ManufacturerDao(this.pool).findWithName(phone.manufacturer),
			new MatrixDao(this.pool).findWithName(phone.matrix),
		]);
		const results = await this.pool.execute(
			"UPDATE `phone` WHERE id = ? SET `model` = ?, `ram` = ?, `hard` = ?, `diagonal` = ?, `matrix_id` = ?, `type_id` = ?, `manufacturer_id` = ?",
			[
				id,
				phone.model,
				phone.ram,
				phone.hard,
				phone.diagonal,
				matrixEntity.id,
				typeEntity.id,
				manufacturerEntity.id,
			]
		);

		this.eo.emit("phoneUpdated", [results[0][0]]);
		return results[0][0];
	}

	async delete(id) {
		const results = await this.pool.execute(
			"DELETE FROM `phone` WHERE id = ?",
			[id]
		);

		this.eo.emit("phoneDeleted", [results[0][0]]);
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

		this.eo.emit("phoneInserted", [results]);
		return results[0][0];
	}
}

module.exports = PhoneDao;

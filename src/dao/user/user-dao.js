class UserDao {
	constructor(pool) {
		this.pool = pool;
	}

	async find(id) {
		const results = await this.pool.execute(
			"SELECT * FROM `user` WHERE id = ?",
			[id]
		);

		return results[0][0];
	}

	async findLogin(login) {
		const results = await this.pool.execute(
			"SELECT * FROM `user` WHERE `login` = ?",
			[login]
		);

		return results[0][0];
	}

	async validate(login, pw) {
		const results = await this.pool.execute(
			"SELECT * FROM `user` WHERE `login` = ?",
			[login]
		);

		if (!results[0][0]) {
			throw new Error("User doesnt exist");
		}

		if (results[0][0].password === pw) {
			return { data: results[0][0], success: true };
		} else {
			return { data: null, success: false };
		}
	}

	async findAll() {
		const results = await this.pool.query("SELECT * FROM `user`");

		return results[0];
	}

	async delete(id) {
		const results = await this.pool.execute("DELETE FROM `user` WHERE id = ?", [
			id,
		]);

		return results[0][0];
	}

	async insert(user) {
		const roleId = await this.pool.execute(
			"SELECT id FROM `role` WHERE `name` = ?",
			[user.role]
		);
		const results = await this.pool.execute(
			"INSERT INTO `user` (`login`, `password`, `role_id`) VALUES (?, ?, ?)",
			[user.login, user.password, roleId]
		);
		return results[0][0];
	}
}

module.exports = UserDao;

const mysql = require("mysql2/promise");

class Connection {
	static async getConnection(type) {
		switch (type) {
			case "mysql": {
				return (await new MysqlConnection().init()).getPool();
			}
			case "mongodb":
				throw new Error("WIP");
			default:
				throw new Error("Unsupported connection type");
		}
	}
}

class MysqlConnection {
	pool = null;
	constructor() {
		if (typeof MysqlConnection.instance === "object") {
			return MysqlConnection.instance;
		}
		MysqlConnection.instance = this;
		return MysqlConnection.instance;
	}
	getPool() {
		return this.pool;
	}
	async init() {
		this.pool = mysql.createPool({
			host: "localhost",
			user: "root",
			database: "nosql_course",
			password: "root",
			waitForConnections: true,
			connectionLimit: 10,
			queueLimit: 0,
		});

		return this;
	}
}
module.exports = Connection;

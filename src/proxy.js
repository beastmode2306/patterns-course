const Connection = require("./db/connection");
const DaoManager = require("./dao/index");

class Proxy {
	constructor(securityLevels) {
		this.userDao = null;
		this.securityLevels = securityLevels;
	}
	async init() {
		this.userDao = DaoManager.getDao(
			"user",
			await Connection.getConnection("mysql")
		);
		return this;
	}

	async request(credentials, cbData, funcTag) {
		try {
			const validation = await this.userDao.validate(
				credentials.login,
				credentials.password
			);
			if (validation.success) {
				if (this.securityLevels[validation.data.role_id].includes(funcTag)) {
					console.log("access granted");
					await cbData[0].call(cbData[1], ...cbData[2]);
				} else {
					console.log("access denied");
				}
			} else {
				console.log("not valid creds");
			}
		} catch (e) {
			console.log(e);
		}
	}
}

module.exports = Proxy;

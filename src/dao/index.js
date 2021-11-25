const ManufacturerDao = require("./manufacturer/manufacturer-dao");
const MatrixDao = require("./matrix/matrix-dao");
const PhoneDao = require("./phone/phone-dao");
const TypeDao = require("./type/type-dao");
const UserDao = require("./user/user-dao");

class DaoManager {
	static getDao(type, pool) {
		switch (type) {
			case "manufacturer":
				return new ManufacturerDao(pool);
			case "matrix":
				return new MatrixDao(pool);
			case "phone":
				return new PhoneDao(pool);
			case "type":
				return new TypeDao(pool);
			case "user":
				return new UserDao(pool);
			default:
				throw Error("Unsupported dao type");
		}
	}
}

module.exports = DaoManager;

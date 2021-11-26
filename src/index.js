const EventObserver = require("./event-observer");
const Connection = require("./db/connection");
const DaoManager = require("./dao/index");
const ManufacturerBuilder = require("./dao/manufacturer/manufacturer-builder");
const TypeBuilder = require("./dao/type/type-builder");
const MatrixBuilder = require("./dao/matrix/matrix-builder");
const PhoneBuilder = require("./dao/phone/phone-builder");
const eo = new EventObserver();

eo.on("phoneInserted", () => console.log("new Phone inserted"));
eo.on("phoneFound", (phone) => console.log("Phone was just found: ", phone));
eo.on("phoneFound", (phone) =>
	console.log("Writing snapshots to file .... ", phone)
);

async function insertPhone() {
	try {
		const dbConnection = await Connection.getConnection("mysql");

		const manufacturerDao = DaoManager.getDao("manufacturer", dbConnection);
		const manufacturerToInsert = new ManufacturerBuilder()
			.addName("Motorolla")
			.build();
		await manufacturerDao.insert(manufacturerToInsert);

		const matrixDao = DaoManager.getDao("matrix", dbConnection);
		const matrixToInsert = new MatrixBuilder().addName("AMOLED").build();
		await matrixDao.insert(matrixToInsert);

		const typeDao = DaoManager.getDao("type", dbConnection);
		const typeToInsert = new TypeBuilder().addName("Smart").build();
		await typeDao.insert(typeToInsert);

		const phoneDao = DaoManager.getDao("phone", dbConnection);
		const phoneToInsert = new PhoneBuilder()
			.addManufacturer(manufacturerToInsert)
			.addMatrix(matrixToInsert)
			.addType(typeToInsert)
			.addDiagonal("6.1")
			.addHard(520000)
			.addRam(2000)
			.addModel("X1")
			.build();

		await phoneDao.insert(phoneToInsert);
	} catch (e) {
		console.warn(e);
	}
}

async function findPhones() {
	try {
		const dbConnection = await Connection.getConnection("mysql");
		const phoneDao = DaoManager.getDao("phone", dbConnection);
		await phoneDao.findAll();
	} catch (error) {
		console.warn(e);
	}
}

// insertPhone();
findPhones();

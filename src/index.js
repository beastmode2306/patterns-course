const EventObserver = require("./event-observer");
const Connection = require("./db/connection");
const DaoManager = require("./dao/index");
const ManufacturerBuilder = require("./dao/manufacturer/manufacturer-builder");
const TypeBuilder = require("./dao/type/type-builder");
const MatrixBuilder = require("./dao/matrix/matrix-builder");
const PhoneBuilder = require("./dao/phone/phone-builder");
const Proxy = require("./proxy");
const eo = new EventObserver();

eo.on("phoneFound", () => console.log("phone was just found"));
eo.on("phoneUpdated", () => console.log("phone was just updated"));
eo.on("phoneInserted", () => console.log("phone was just inserted"));

async function updateInSequence() {
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

async function onAccessGranted() {
	console.log("access granted");
}

// updateInSequence();
async function secureAccess(creds) {
	const proxy = await new Proxy({
		1: ["find", "findAll"],
		2: ["find", "findAll", "update", "delete", "insert"],
	}).init();

	const dbConnection = await Connection.getConnection("mysql");
	const manufacturerDao = DaoManager.getDao("manufacturer", dbConnection);
	const manufacturerToInsert = new ManufacturerBuilder()
		.addName("Motorolla")
		.build();

	await proxy.request(
		creds,
		[manufacturerDao.insert, manufacturerDao, [manufacturerToInsert]],
		"insert"
	);

	await proxy.request(
		creds,
		[manufacturerDao.findAll, manufacturerDao, []],
		"findAll"
	);
}

async function run() {
	await secureAccess({ login: "defaultuser", password: "123" });

	await secureAccess({ login: "adminuser", password: "123" });
}
run();

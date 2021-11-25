const EventObserver = require("./event-observer");
const Connection = require("./db/connection");
const DaoManager = require("./dao/index");
const ManufacturerBuilder = require("./dao/manufacturer/manufacturer-builder");
const TypeBuilder = require("./dao/type/type-builder");
const MatrixBuilder = require("./dao/matrix/matrix-builder");
const PhoneBuilder = require("./dao/phone/phone-builder");
const { Caretaker } = require("./memento");

const caretaker = new Caretaker();
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

		const phoneToUpdate1 = new PhoneBuilder()
			.addManufacturer(manufacturerToInsert)
			.addMatrix(matrixToInsert)
			.addType(typeToInsert)
			.addDiagonal("6.1")
			.addHard(123)
			.addRam(2000)
			.addModel("X1")
			.build();

		const phoneToUpdate2 = new PhoneBuilder()
			.addManufacturer(manufacturerToInsert)
			.addMatrix(matrixToInsert)
			.addType(typeToInsert)
			.addDiagonal("612")
			.addHard(8562)
			.addRam(588)
			.addModel("X1")
			.build();

		const phoneToUpdate3 = new PhoneBuilder()
			.addManufacturer(manufacturerToInsert)
			.addMatrix(matrixToInsert)
			.addType(typeToInsert)
			.addDiagonal("123")
			.addHard(75856)
			.addRam(2076700)
			.addModel("1528")
			.build();

		caretaker.addSnapshot(phoneToInsert);
		caretaker.addSnapshot(phoneToUpdate1);
		caretaker.addSnapshot(phoneToUpdate2);
		caretaker.addSnapshot(phoneToUpdate3);

		await phoneDao.insert(phoneToInsert);

		await phoneDao.update(1, phoneToUpdate1);
		await phoneDao.update(1, phoneToUpdate2);
		await phoneDao.update(1, phoneToUpdate3);

		console.log(await phoneDao.find(1));

		await phoneDao.update(1, caretaker.restoreSnapshot(0));

		console.log(await phoneDao.find(1));
	} catch (e) {
		console.warn(e);
	}
}

updateInSequence();

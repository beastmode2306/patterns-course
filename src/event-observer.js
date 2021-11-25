class EventObserver {
	listeners = {};

	constructor() {
		if (typeof EventObserver.instance === "object") {
			return EventObserver.instance;
		}
		EventObserver.instance = this;
		return EventObserver.instance;
	}

	on(event, cb) {
		this.listeners[event] = cb;
	}
	emit(event, params) {
		process.nextTick(() => {
			this.listeners[event].call(null, ...params);
		});
	}
}

module.exports = EventObserver;

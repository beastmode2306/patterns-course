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
		this.listeners[event] = this.listeners[event] || []
		this.listeners[event].push(cb);
	}
	emit(event, params) {
		process.nextTick(() => {
			this.listeners[event].forEach(e => e.call(null, ...params));
		});
	}
}

module.exports = EventObserver;

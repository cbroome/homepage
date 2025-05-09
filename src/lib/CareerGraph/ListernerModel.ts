/**
 * Backbone-type model that can listen to events.
 */
export class ListenerModel {
	listeners: Map<string, (() => void)[]>;

	constructor() {
		this.listeners = new Map();
	}

	addListener(event: string, listener: () => void) {
		const existingListeners = this.listeners.get(event) || [];
		this.listeners.set(event, [...existingListeners, listener]);
	}

	removeListener(event: string) {
		this.listeners.delete(event);
	}

	reset() {
		this.listeners.clear();
	}

	trigger(event: string) {
		const listeners = this.listeners.get(event);

		if (listeners) {
			listeners.forEach((listener) => {
				listener();
			});
		}
	}
}

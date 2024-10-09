// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createProxy = <T extends object>(target: T): T => {
	const listeners: { [key: string]: Function[] } = {};

	// Add a method to subscribe to property changes
	const subscribe = (prop: string, callback: Function) => {
		if (!listeners[prop]) {
			listeners[prop] = [];
		}
		listeners[prop].push(callback);
	};

	return new Proxy(target, {
		get(target, prop) {
			if (prop === 'subscribe') {
				return subscribe; // Expose the subscribe method
			}
			return Reflect.get(target, prop); // Return the actual property value
		},
		set(target, prop, value) {
			// Notify subscribers before setting the new value
			if (listeners[prop as string]) {
				listeners[prop as string].forEach((callback) => callback(value));
			}

			// Set the new property value
			return Reflect.set(target, prop, value);
		},
	});
};

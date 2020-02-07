export const throttle = (fn: Function, delay: number) => {
	let isThrottle: boolean, timer: any, last: number;
	return (...args: any[]) => {
		//@ts-ignore
		const context = this;
		if (!isThrottle) {
			fn.apply(context, args);
			last = Date.now();
			isThrottle = true;
		} else {
			clearTimeout(timer);
			timer = setTimeout(() => {
				if (Date.now() - last >= delay) {
					fn.apply(context, args);
					last = Date.now();
				}
			}, delay - (Date.now() - last));
		}
	};
};

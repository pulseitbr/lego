export const debounce = (fn: Function, delay: number) => {
	let timer: any;
	return function() {
		//@ts-ignore
		const self = this;
		const args = arguments;
		clearTimeout(timer);
		timer = setTimeout(() => fn.apply(self, args), delay);
	};
};

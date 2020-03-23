export const debounce = (fn: Function, delay: number) => {
	let timer: any;
	return (...args: any) => {
		//@ts-ignore
		const self = this;
		clearTimeout(timer);
		timer = setTimeout(() => fn.apply(self, args), delay);
	};
};

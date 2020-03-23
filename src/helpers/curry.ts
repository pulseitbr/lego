export const curry = <T extends Function, Args extends any>(func: T) =>
	function curried(...args: Args[]) {
		if (args.length >= func.length) {
			//@ts-ignore
			return func.apply(this, args);
		}
		return function(...args2: Args[]) {
			//@ts-ignore
			return curried.apply(this, args.concat(args2));
		};
	};

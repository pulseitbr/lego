type ClassesArgs = string | number | undefined | false | null | ClassesArray | ClassesObject;
type ClassesObject = {
	[key: string]: boolean | null | undefined;
};
type ClassesArray = ClassesArgs[];

const classes = (...args: ClassesArgs[]): string => {
	const array = args.filter(Boolean).reduce((acc: Array<unknown>, el) => {
		if (Array.isArray(el)) {
			return acc.concat(el.filter(Boolean));
		}
		if (typeof el === "string") {
			return acc.concat(el);
		}
		for (const key in el as any) {
			if (!!el && !!el[key]) {
				acc.push(key);
			}
		}
		return acc;
	}, []);
	return [...new Set(array)].join(" ");
};

export default classes;

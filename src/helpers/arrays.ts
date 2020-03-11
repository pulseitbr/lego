const props = Object.prototype.hasOwnProperty;

const areObject = (a: unknown, b: unknown) => a && b && typeof a === "object" && typeof b === "object";

const checkInstance = (a: unknown, b: unknown, instance: any) => [a instanceof instance, b instanceof instance];

const Equals = (value: any, target: any) => {
	if (value === target) {
		return true;
	}
	if (!areObject(value, target)) {
		return value !== value && target !== target;
	}

	const targetArr = Array.isArray(value);
	const valueArr = Array.isArray(target);

	if (targetArr !== valueArr) {
		return false;
	}

	let length = 0;

	if (targetArr && valueArr) {
		length = value.length;
		if (length !== target.length) {
			return false;
		}
		for (let i = length; i-- !== 0; ) {
			if (!Equals(value[i], target[i])) {
				return false;
			}
		}
		return true;
	}
	const [valueDate, targetDate] = checkInstance(value, target, Date);

	if (valueDate !== targetDate) {
		return false;
	}

	if (valueDate && targetDate) {
		return value.getTime() === target.getTime();
	}

	const [regexValue, regexTarget] = checkInstance(value, target, RegExp);
	if (regexValue !== regexTarget) {
		return false;
	}
	if (regexValue && regexTarget) {
		return value.toString() === target.toString();
	}

	const objectKeys = Object.keys(value);
	length = objectKeys.length;
	if (length !== Object.keys(target).length) {
		return false;
	}

	for (let i = length; i-- !== 0; ) {
		if (!props.call(target, objectKeys[i])) {
			return false;
		}
	}
	for (let i = length; i-- !== 0; ) {
		if (!Equals(value[objectKeys[i]], target[objectKeys[i]])) {
			return false;
		}
	}
	return true;
};

type Grouped<GENERICS> = {
	[K in keyof GENERICS]: GENERICS[K][];
};

function curry<T extends Function, Args extends any>(func: T) {
	return function curried(...args: Args[]) {
		if (args.length >= func.length) {
			//@ts-ignore
			return func.apply(this, args);
		}
		return function(...args2: Args[]) {
			//@ts-ignore
			return curried.apply(this, args.concat(args2));
		};
	};
}

type ArrayCallback<T> = (item: T, index: number, array: T[]) => T;

type ArrayCallbackAssertion<T> = (item: T, index: number, array: T[]) => boolean;

const spreadData = (item: unknown) => {
	if (Array.isArray(item)) {
		return [...item];
	}
	if (typeof item === "object" && item !== null) {
		return { ...item };
	}
	return item;
};

const getKey = <T>(obj: any, key?: any): T => {
	if ((typeof obj === "object" || Array.isArray(obj)) && !!key) {
		return obj[key];
	}
	return obj;
};

type ObjectMap = { [key: string]: never };

const sortBy = (key: string) => (a: ObjectMap, b: ObjectMap) => (a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0);

type Symbols = "==" | "===" | ">" | ">=" | "<" | "<=" | "eq" | "is";

type WhereFunction<T, V> = (value: T, compare: V, index: number, array: T[]) => boolean;
type SymbolMap<T, V> = {
	[key in Symbols]: WhereFunction<T, V>;
};

const symbolMap: SymbolMap<any, any> = {
	"===": (value, compare) => value === compare,
	// eslint-disable-next-line eqeqeq
	"==": (value, compare) => value == compare,
	">": (value: number, compare: number) => value > compare,
	">=": (value: number, compare: number) => value >= compare,
	"<": (value: number, compare: number) => value < compare,
	"<=": (value: number, compare: number) => value <= compare,
	eq: Equals,
	is: Object.is
};

const OperationFromSymbol = (symbol: Symbols) => symbolMap[symbol];

export class Arrays<Type> {
	private array: Type[];
	public constructor(array: Type[]) {
		this.array = [...array];
	}

	//@ts-ignore
	public static Map: (<T>(callback: ArrayCallback<T>) => (array: T[]) => never[]) &
		(<T>(callback: ArrayCallback<T>, array: T[]) => never[]) = curry(<T>(callback: ArrayCallback<T>, array: T[]) => {
		const mappedArray = [];
		let index = 0;
		const len = array.length;
		for (index; index < len; index++) {
			const transform = callback(array[index] as T, index, array);
			mappedArray.push(spreadData(transform) as T);
		}
		return mappedArray;
	});

	public static Filter: <GENERICS>(callback: ArrayCallbackAssertion<GENERICS>, array: GENERICS[]) => GENERICS[] = curry(
		<GENERICS>(callback: ArrayCallbackAssertion<GENERICS>, array: GENERICS[]) => {
			const mappedArray = [];
			for (let index = 0; index < array.length; index++) {
				const includes = callback(array[index] as GENERICS, index, array);
				if (includes) {
					mappedArray.push(spreadData(array[index]) as GENERICS);
				}
			}
			return mappedArray;
		}
	);

	public static GroupBy: <GENERICS>(key: keyof GENERICS, array: GENERICS[]) => Grouped<GENERICS> = curry(
		<GENERICS>(key: keyof GENERICS, array: GENERICS[]) =>
			Arrays.Reduce(
				(g, el) => {
					const name: keyof GENERICS = el[key] as never;
					const chunk = g[name] || [];
					g[name] = chunk;
					g[name].push(el as any);
					return g;
				},
				{} as Grouped<GENERICS>,
				array
			)
	);
	public static Find: <GENERICS>(callback: ArrayCallbackAssertion<GENERICS>, array: GENERICS[], placeholder: unknown) => GENERICS | null = curry(
		<GENERICS>(callback: ArrayCallbackAssertion<GENERICS>, array: GENERICS[], placeholder: unknown = null) => {
			for (let index = 0; index < array.length; index++) {
				const includes = callback(array[index] as GENERICS, index, array);
				if (includes) {
					return spreadData(array[index]) as GENERICS;
				}
			}
			return placeholder;
		}
	);

	//@ts-ignore
	public static Some: (<GENERICS>(callback: ArrayCallbackAssertion<GENERICS>) => (array: GENERICS[]) => boolean) &
		(<GENERICS>(callback: ArrayCallbackAssertion<GENERICS>, array: GENERICS[]) => boolean) = curry(
		<GENERICS>(callback: ArrayCallbackAssertion<GENERICS>, array: GENERICS[]) => {
			for (let index = 0; index < array.length; index++) {
				const includes = callback(array[index] as GENERICS, index, array);
				if (includes) {
					return true;
				}
			}
			return false;
		}
	);

	public static Every: <GENERICS>(callback: ArrayCallbackAssertion<GENERICS>, array: GENERICS[]) => boolean = curry(
		<GENERICS>(callback: ArrayCallbackAssertion<GENERICS>, array: GENERICS[]) => {
			for (let index = 0; index < array.length; index++) {
				const includes = callback(array[index] as GENERICS, index, array);
				if (!includes) {
					return false;
				}
			}
			return true;
		}
	);

	//@ts-ignore
	public static Unique: (<GENERICS>(array: GENERICS[]) => (array: GENERICS[]) => GENERICS[]) &
		(<GENERICS>(array: GENERICS[], key: keyof GENERICS) => GENERICS[]) = curry(<T>(array: T[], key: keyof T) => {
		const seen = new Set();
		if (Array.isArray(key)) {
			return [...new Set(key)];
		}
		return Arrays.Filter((el) => {
			const duplicate = key ? seen.has(el[key]) : seen.has(key);
			if (!!key) {
				if (!duplicate) {
					seen.add(el[key]);
				}
			}
			return !duplicate;
		}, array);
	});

	public static Reduce: <GENERICS, Initial>(
		callback: (acc: Initial, current: GENERICS, index: number, array: GENERICS[]) => unknown,
		initial: Initial,
		array: GENERICS[]
	) => Initial = curry(
		<GENERICS, Initial>(
			callback: (acc: Initial, current: GENERICS, index: number, array: GENERICS[]) => unknown,
			initial: Initial,
			array: GENERICS[]
		) => {
			let accumulator = initial;
			for (let index = 0; index < array.length; index++) {
				const element = array[index];
				accumulator = callback(accumulator, element, index, array) as any;
			}
			return accumulator;
		}
	);

	public static Chunk: <GENERICS>(chunk: number, array: GENERICS[]) => GENERICS[][] = curry(<GENERICS>(size: number, array: GENERICS[]) =>
		Arrays.Reduce(
			(arr, item, index): any => {
				if (index % size === 0) {
					return [...arr, [item]];
				}
				return [...arr.slice(0, -1), [...arr.slice(-1)[0], item]];
			},
			([] as any) as GENERICS[][],
			array
		)
	);

	public static Range: (length: number, steps: number, transform: ArrayCallback<number>) => number[] = curry(
		(length: number, steps: number, transform: ArrayCallback<number>) => {
			const arr = Array.from({ length }, (_, i) => i * steps);
			if (!!transform) {
				return Arrays.Map(transform, arr);
			}
			return arr;
		}
	);

	public static SortBy: <GENERICS>(array: GENERICS[], key: keyof GENERICS) => GENERICS[] = curry(
		<GENERICS>(array: GENERICS[], key: keyof GENERICS) => {
			const a = [...array].sort(sortBy(key as any) as never);
			return a;
		}
	);

	public static Repeat: <GENERICS>(element: GENERICS, repeat: number) => GENERICS[] = curry(<GENERICS>(element: GENERICS, repeat: number) => {
		const array = [] as GENERICS[];
		for (let index = 0; index < repeat; index++) {
			array.push(element);
		}
		return array;
	});

	public static Contains: <GENERICS>(element: GENERICS | keyof GENERICS, array: GENERICS[]) => boolean = curry(
		<GENERICS>(element: GENERICS | keyof GENERICS, array: GENERICS[]) => {
			if (typeof element === "object") {
				for (let index = 0; index < array.length; index++) {
					const current = array[index];
					if (Equals(element, current)) {
						return true;
					}
				}
				return false;
			}
			for (let index = 0; index < array.length; index++) {
				const current = array[index];
				if (element in current) {
					return true;
				}
			}
			return false;
		}
	);

	public static Max: <GENERICS>(
		element: keyof GENERICS,
		array: GENERICS[]
	) => number = curry(<GENERICS>(element: keyof GENERICS, array: GENERICS[]) =>
		Arrays.Reduce((oa, u) => Math.max(oa, u[element] as any), 0, array)
	);

	public static Min: <GENERICS>(
		element: keyof GENERICS,
		array: GENERICS[]
	) => number = curry(<GENERICS>(element: keyof GENERICS, array: GENERICS[]) =>
		Arrays.Reduce((oa, u) => Math.min(oa, u[element] as any), Number.MAX_VALUE, array)
	);

	public static MapToArray = <Key, Value>(map: Map<Key, Value>): Value[] => {
		return [...map.values()];
	};

	public static Compose(...fns: Array<(elements: unknown[]) => unknown>) {
		return Arrays.Reduce((accumulator, current) => (...arr: unknown[]) => current(accumulator(...arr)), [] as any, fns);
	}

	public Where: ((cmp: ArrayCallbackAssertion<Type>) => this) & ((key: keyof Type, symbol?: Symbols, value?: unknown) => this) = (
		key: keyof Type | ArrayCallbackAssertion<Type>,
		symbol?: Symbols,
		value?: unknown
	) => {
		if (typeof key === "function") {
			this.array = this.array.filter(key);
			return this;
		}
		this.array = this.array.filter((x, i, array) => OperationFromSymbol(symbol!)(getKey(x, key), value, i, array));
		return this;
	};

	public Reverse() {
		this.array = this.array.reverse();
		return this;
	}

	public Add(el: Type | Type[]) {
		if (Array.isArray(el)) {
			this.array.push(...el);
		} else {
			this.array.push(el);
		}
		return this;
	}
	public Push(el: Type | Type[]) {
		this.Add(el);
		return this;
	}

	public Select(transform?: ArrayCallback<Type>) {
		if (transform !== undefined) {
			return this.array.map(transform);
		}
		return this.ToArray();
	}

	public Take(amount: number) {
		this.array = [...this.array].slice(0, Math.max(0, amount));
		return this;
	}

	public Distinct() {
		this.array = Arrays.Filter((el, index, array) => {
			let findIndex;
			if (typeof el === "object") {
				findIndex = array.findIndex((obj) => Equals(obj, el));
			} else {
				findIndex = array.indexOf(el);
			}
			return index === findIndex;
		}, this.array);
		return this;
	}

	public ToArray() {
		return [...this.array];
	}

	public Sum(key: keyof Type) {
		return Arrays.Reduce((acc, el) => acc + getKey<number>(el, key), 0, this.array);
	}

	public Average(key: keyof Type) {
		return this.Sum(key) / this.array.length;
	}
}

// ToDo: Date sort
export const Sort = {
	String: <T>({ reverse = false, key }: { reverse?: boolean; key?: keyof T }) => {
		const reverseN = reverse ? -1 : 1;
		if (!!key) {
			return (a: T, b: T) => ((a[key] as never) as string).localeCompare(b[key] as never) * reverseN;
		}
		return (a: T, b: T) => ((a as never) as string).localeCompare(b as never) * reverseN;
	},
	Number: <T>({ reverse = false, key }: { reverse?: boolean; key?: keyof T }) => {
		const reverseN = reverse ? -1 : 1;
		if (!!key) {
			return (a: T, b: T) => (((a[key] as never) as number) - (b[key] as never)) * reverseN;
		}
		return (a: T, b: T) => (((a as never) as number) - (b as never)) * reverseN;
	}
};

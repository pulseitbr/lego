import { Equals } from "../validations";

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

const getKey = (obj: any, key?: any) => {
	if ((typeof obj === "object" || Array.isArray(obj)) && !!key) {
		return obj[key];
	}
	return obj;
};

type ObjectMap = { [key: string]: never };

const sortBy = (key: string) => (a: ObjectMap, b: ObjectMap) => (a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0);

type Symbols = "==" | "===" | ">" | ">=" | "<" | "<=" | "eq";

type SymbolMap<T, V> = {
	[key in Symbols]: (value: T, compare: V, index: number, array: T[]) => boolean;
};

const symbolMap: SymbolMap<any, any> = {
	"===": (value, compare) => value === compare,
	// eslint-disable-next-line eqeqeq
	"==": (value, compare) => value == compare,
	">": (value: number, compare: number) => value > compare,
	">=": (value: number, compare: number) => value >= compare,
	"<": (value: number, compare: number) => value < compare,
	"<=": (value: number, compare: number) => value <= compare,
	eq: Equals
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

	public static Filter: <GenericType>(callback: ArrayCallbackAssertion<GenericType>, array: GenericType[]) => GenericType[] = curry(
		<GenericType>(callback: ArrayCallbackAssertion<GenericType>, array: GenericType[]) => {
			const mappedArray = [];
			for (let index = 0; index < array.length; index++) {
				const includes = callback(array[index] as GenericType, index, array);
				if (includes) {
					mappedArray.push(spreadData(array[index]) as GenericType);
				}
			}
			return mappedArray;
		}
	);

	public static Find: <GenericType>(
		callback: ArrayCallbackAssertion<GenericType>,
		array: GenericType[],
		placeholder: unknown
	) => GenericType | null = curry(
		<GenericType>(callback: ArrayCallbackAssertion<GenericType>, array: GenericType[], placeholder: unknown = null) => {
			for (let index = 0; index < array.length; index++) {
				const includes = callback(array[index] as GenericType, index, array);
				if (includes) {
					return spreadData(array[index]) as GenericType;
				}
			}
			return placeholder;
		}
	);

	//@ts-ignore
	public static Some: (<T>(callback: ArrayCallbackAssertion<T>) => (array: T[]) => boolean) &
		(<T>(callback: ArrayCallbackAssertion<T>, array: T[]) => boolean) = curry(<T>(callback: ArrayCallbackAssertion<T>, array: T[]) => {
		for (let index = 0; index < array.length; index++) {
			const includes = callback(array[index] as T, index, array);
			if (includes) {
				return true;
			}
		}
		return false;
	});

	public static Every: <GenericType>(callback: ArrayCallbackAssertion<GenericType>, array: GenericType[]) => boolean = curry(
		<GenericType>(callback: ArrayCallbackAssertion<GenericType>, array: GenericType[]) => {
			for (let index = 0; index < array.length; index++) {
				const includes = callback(array[index] as GenericType, index, array);
				if (!includes) {
					return false;
				}
			}
			return true;
		}
	);

	//@ts-ignore
	public static Unique: (<T>(array: T[]) => (array: T[]) => never[]) & (<T>(key: keyof T, array: T[]) => never[]) = curry(
		<T>(key: keyof T, array: T[]) => {
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
		}
	);

	public static Reduce: <GenericType, Initial>(
		callback: (acc: Initial, current: GenericType, index: number, array: GenericType[]) => unknown,
		initial: Initial,
		array: GenericType[]
	) => Initial = curry(
		<GenericType, Initial>(
			callback: (acc: Initial, current: GenericType, index: number, array: GenericType[]) => unknown,
			initial: Initial,
			array: GenericType[]
		) => {
			let accumulator = initial;
			for (let index = 0; index < array.length; index++) {
				const element = array[index];
				accumulator = callback(accumulator, element, index, array) as any;
			}
			return accumulator;
		}
	);

	public static Chunk: <GenericType>(chunk: number, array: GenericType[]) => GenericType[][] = curry(
		<GenericType>(size: number, array: GenericType[]) =>
			Arrays.Reduce(
				(arr, item, index): any => {
					if (index % size === 0) {
						return [...arr, [item]];
					}
					return [...arr.slice(0, -1), [...arr.slice(-1)[0], item]];
				},
				([] as any) as GenericType[][],
				array
			)
	);

	public static Range: (length: number, steps: number) => number[] = curry((length: number, steps: number) =>
		Array.from({ length }, (_, i) => i * steps)
	);

	public static SortBy: <GenericType>(
		array: GenericType[],
		key: keyof GenericType
	) => GenericType[] = curry(<GenericType>(array: GenericType[], key: keyof GenericType) => [...array].sort(sortBy(key as any) as never));

	public static Repeat: <GenericType>(element: GenericType, repeat: number) => GenericType[] = curry(
		<GenericType>(element: GenericType, repeat: number) => {
			const array = [] as GenericType[];
			for (let index = 0; index < repeat; index++) {
				array.push(element);
			}
			return array;
		}
	);

	public static Contains: <GenericType>(element: GenericType | keyof GenericType, array: GenericType[]) => boolean = curry(
		<GenericType>(element: GenericType | keyof GenericType, array: GenericType[]) => {
			for (let index = 0; index < array.length; index++) {
				const current = array[index];
				if (element in current) {
					return true;
				}
			}
			return false;
		}
	);

	public static Compose(...fns: Array<(elements: unknown[]) => unknown>) {
		return Arrays.Reduce((accumulator, current) => (...arr: unknown[]) => current(accumulator(...arr)), [] as any, fns);
	}

	public Where(key: keyof Type, symbol: Symbols, value: unknown) {
		this.array = this.array.filter((x, i, array) => OperationFromSymbol(symbol)(getKey(x, key), value, i, array));
		return this;
	}

	public Reverse() {
		this.array = [...this.array].reverse();
		return this;
	}

	public Select(transform?: ArrayCallback<Type>) {
		if (!!transform) {
			return this.array.map(transform);
		}
		return this.array;
	}
}

Arrays.Unique("fuck", [
	{ a: 1, b: 3, fuck: 999 },
	{ a: 1, b: 3, fuck: 999 },
	{ a: 1, b: 3, fuck: 999 },
	{ a: 1, b: 3, fuck: 999 },
	{ a: 1, b: 3, fuck: 999 }
]);

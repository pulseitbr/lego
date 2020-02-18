import { Maybe } from "../typings";

export const maybe = <T>(value: Maybe<T>) => {
	return {
		isPresent: !(value === null || value === undefined),
		value
	};
};

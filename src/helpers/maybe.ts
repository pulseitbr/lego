import { Maybe } from "../typings";

export const maybe = <T>(value: Maybe<T>) => ({
	isPresent: !(value === null || value === undefined),
	value
});

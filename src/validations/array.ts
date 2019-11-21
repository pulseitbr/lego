export const IsArray = Array.isArray;

export const IsArrayEmpty = (something: unknown) => {
	if (IsArray(something)) {
		return something.length === 0;
	}
	return true;
};

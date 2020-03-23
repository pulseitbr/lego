export const Optional = <T>(maybeValue?: T) => {
	const isPresent = maybeValue !== null || maybeValue !== undefined;
	return {
		ifPresent(predicate: (val: T) => void) {
			if (isPresent) {
				predicate(maybeValue!);
			}
		},
		isPresent: () => isPresent,
		map(predicate: (val?: T) => void) {
			if (isPresent) {
				return predicate(maybeValue!);
			}
			return Optional(predicate(maybeValue));
		}
	};
};

Optional.of = <T>(maybeValue?: T) => Optional(maybeValue);

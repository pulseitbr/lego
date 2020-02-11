type Validation<Value, Schema> = (
	value: Value,
	object: Schema
) => {
	valid: boolean;
	messages?: string[];
};

type Validate<Schema> = { [key in keyof Schema]: Validation<Schema[key], Schema> };

type ValidateObject<Schema> = {
	[key in keyof Schema]: {
		valid: boolean;
		messages: string[];
	};
};

type PartialValidateObject<Schema> = Partial<ValidateObject<Schema>>;

export const validate: (<Schema>(schema: Schema, predicate: Validate<Schema>, removeValidValues?: true) => PartialValidateObject<Schema>) &
	(<Schema>(schema: Schema, predicate: Validate<Schema>, removeValidValues?: false) => ValidateObject<Schema>) = <Schema>(
	schema: Schema,
	predicate: Validate<Schema>,
	removeValidValues: boolean = true
) => {
	const validations = {} as any;
	Object.entries(predicate).forEach((validation: [any, any]) => {
		const [key, fn]: [keyof Schema, Validation<Schema[keyof Schema], Schema>] = validation;
		const { valid, messages = [] } = fn(schema[key], schema);
		if (removeValidValues) {
			if (!valid) {
				validations[key] = { valid: false, messages };
			}
		} else {
			validations[key] = { valid, messages };
		}
	});
	return validations;
};

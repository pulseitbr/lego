export const OnlyNumbers = (t: string = "") => t.replace(/[^\d]/gi, "");

export const StringToArray = (string: string = "") => string.split("");

export const ReverseString = (string: string = "") =>
	StringToArray(string)
		.reverse()
		.join("");

export const ToInt = (int: number | string) => Number.parseInt(ToNumberString(int.toString()), 10);

export const ToNumberString = (number: string = "") =>
	number
		.replace(/\./g, "")
		.replace(/,/g, ".")
		.replace(/[^\d\.]/g, "");
export const ToFloat = (number: string) => Number.parseFloat(ToNumberString(number));

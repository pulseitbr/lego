import Decimal from "decimal.js";

export const OnlyNumbers = (t: string = "") => t.replace(/[^\d]/gi, "");

export const GetChars = (string: string = "") => string.split("");

export const ReverseString = (string: string = "") =>
	GetChars(string)
		.reverse()
		.join("");

export const ToInt = (int: number | string) => Number.parseInt(ToNumberString(int.toString()), 10);

export const ToNumberString = (number: string = "", precision = 2) =>
	new Decimal(number)
		.toDP(precision)
		.toNumber()
		.toString();
export const ToFloat = (number: string) => Number.parseFloat(ToNumberString(number));

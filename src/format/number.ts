import Decimal from "decimal.js";

export const OnlyNumbers = (t: string = "") => t.replace(/[^\d]/gi, "");

export const ToInt = (int: number | string) => Number.parseInt(ToNumberString(int.toString()), 10);

export const ToNumberString = (number: string | number = "", precision = 2) =>
	new Decimal(number)
		.toDP(precision)
		.toNumber()
		.toString();

export const ToNumber = (number: string | number = "", precision = 2) => new Decimal(number).toDP(precision).toNumber();

export const ToFloat = (number: string) => Number.parseFloat(ToNumberString(number));

export const FormatCurrencyFloor = (value: string | number, precision: number = 3, currency: string = "BRL") => {
	const str = new Intl.NumberFormat("pt-BR", { style: "currency", currency, minimumFractionDigits: precision }).format(
		new Decimal(value)
			.toDecimalPlaces(precision)
			.toDP(precision)
			.toNumber()
	);
	return str.slice(0, -1);
};

export const FormatCurrencyToFloat = (currency: string | number = "", precision = 2) =>
	Number.parseFloat(ToNumberString(currency.toString(), precision));
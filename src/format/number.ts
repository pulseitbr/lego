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

export const CurrencyToFloatString = (value: string | number) =>
	`${value}`
		.replace(/[A-Z$ ]+([\d.]+),(\d+)/i, "$1,$2")
		.replace(/\./gi, "")
		.replace(/,/, ".");

export const FormatCurrencyFloor = (value: string | number, precision: number = 3, currency: string = "BRL") => {
	const str = new Intl.NumberFormat("pt-BR", { style: "currency", currency, minimumFractionDigits: precision }).format(
		new Decimal(CurrencyToFloatString(value))
			.toDecimalPlaces(precision)
			.toDP(precision)
			.toNumber()
	);
	return str.slice(0, -1);
};

export const FormatCurrencyToFloat = (currency: string | number = "", precision = 2) =>
	Number.parseFloat(ToNumberString(currency.toString(), precision));

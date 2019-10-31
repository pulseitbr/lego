import Decimal from "decimal.js";

export const OnlyNumbers = (t: string = "") => t.replace(/[^\d]/gi, "");

export const ToInt = (int: number | string) => Number.parseInt(ToNumberString(int.toString()), 10);

export const ToNumberString = (number: string = "", precision = 2) =>
	new Decimal(number)
		.toDP(precision)
		.toNumber()
		.toString();
export const ToFloat = (number: string) => Number.parseFloat(ToNumberString(number));

export const formatCurrencyFloor = (value: string | number) => {
	const str = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 3 }).format(
		new Decimal(value)
			.toDecimalPlaces(3)
			.toDP(3)
			.toNumber()
	);
	return str.slice(0, -1);
};

export const FormatCurrencyToFloat = (currency: string | number = "", precision = 2) =>
	Number.parseFloat(ToNumberString(currency.toString(), precision));

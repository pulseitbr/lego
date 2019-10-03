import { OnlyNumbers, ToNumberString } from "../utils";
import Decimal from "decimal.js";

export const FormatCep = (cep: string = "") => OnlyNumbers(cep).replace(/(\d{5})(\d{3})/gi, "$1-$2");

export const FormatCpf = (cpf: string = "") =>
	OnlyNumbers(cpf).replace(/(\d{3})(\d{3})(\d{3})(\d{2})/gi, "$1.$2.$3-$4");

export const FormatCnpj = (cnpj: string = "") =>
	OnlyNumbers(cnpj).replace(/(\d{2})(\d{3})(\d{3})(\d{3})(\d{2})/gi, "$1.$2.$3/$4-$5");

export const FormatCpfOrCnpj = (doc: string = "") => (doc.length === 11 ? FormatCpf(doc) : FormatCnpj(doc));

export const FormatPhone = (phone: string = "") => {
	const t = OnlyNumbers(phone);
	if (t.length === 8) {
		return t.replace(/(\d{4})(\d{4})/gi, "$1-$2");
	}
	if (t.length === 9) {
		return t.replace(/(\d{5})(\d{4})/gi, "$1-$2");
	}
	if (t.length === 10) {
		return t.replace(/(\d{2})(\d{4})(\d{4})/gi, "($1) $2-$3");
	}
	if (t.length === 11) {
		return t.replace(/(\d{2})(\d{4})(\d{4})/gi, "($1) $2-$3");
	}
	return t.replace(/(\d\d)(\d\d)(\d{5})(\d{4})/gi, "+$1 $2 $3-$4");
};

export const FormatBrlToFloat = (currency: string | number = "") =>
	Number.parseFloat(ToNumberString(currency.toString()));

export const FormatBRL = (number: string | number = "") =>
	new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" })
		.format(new Decimal(number).toNumber())
		.replace(/\$/, "$ ");

export const FormatBrNumber = (number: string | number = "") =>
	new Intl.NumberFormat("pt-BR").format(FormatBrlToFloat(number));

export const FormatBoleto = (boleto: string) =>
	OnlyNumbers(boleto).replace(/^(\d{5})(\d{5})(\d{5})(\d{6})(\d{5})(\d{6})(\d)(\d{14})$/, "$1.$2 $3.$4 $5.$6 $7 $8");

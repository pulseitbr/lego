import { TitleFormat, Trim } from ".";
import { FormatCurrencyToFloat, OnlyNumbers, ToNumber } from "./number";

export const FormatCep = (cep: string = "") => OnlyNumbers(cep).replace(/(\d{5})(\d{3})/gi, "$1-$2");

export const FormatCpf = (cpf: string = "") => OnlyNumbers(cpf).replace(/(\d{3})(\d{3})(\d{3})(\d{2})/gi, "$1.$2.$3-$4");

export const FormatCnpj = (cnpj: string = "") => OnlyNumbers(cnpj).replace(/(\d{2})(\d{3})(\d{3})(\d{3})(\d{2})/gi, "$1.$2.$3/$4-$5");

export const FormatCpfOrCnpj = (doc: string = "") => (doc.length === 11 ? FormatCpf(doc) : FormatCnpj(doc));

export const FormatPhone = (phone: string = "", countryCodeLength = 2) => {
	const numbers = OnlyNumbers(phone);
	if (numbers.length === 8) {
		return numbers.replace(/(\d{4})(\d{4})/gi, "$1-$2");
	}
	if (numbers.length === 9) {
		return numbers.replace(/(\d{5})(\d{4})/gi, "$1-$2");
	}
	if (numbers.length === 10) {
		return numbers.replace(/(\d{2})(\d{4})(\d{4})/gi, "($1) $2-$3");
	}
	if (numbers.length === 11) {
		return numbers.replace(/(\d{2})(\d{4})(\d{4})/gi, "($1) $2-$3");
	}
	return numbers.replace(new RegExp(`(\d${countryCodeLength})(\d\d)(\d{5})(\d{4})`, "gi"), "+$1 $2 $3-$4");
};

export const FormatBRL = (number: string | number = "") => {
	const str = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(ToNumber(number));
	/*
        No browser, a API de Intl usa o carácter 160(&nbsp ou Non-breaking space) da tabela ASCII,
        quebrando toda comparação feita com o carácter 32 (espaço)
    */
	return Trim(str).replace(/\u00A0/g, " ");
};

export const FormatBrNumber = (number: string | number = "") => new Intl.NumberFormat("pt-BR").format(FormatCurrencyToFloat(number));

export const FormatBoleto = (boleto: string) =>
	OnlyNumbers(boleto).replace(/^(\d{5})(\d{5})(\d{5})(\d{6})(\d{5})(\d{6})(\d)(\d{14})$/, "$1.$2 $3.$4 $5.$6 $7 $8");

export const BRSentence = (str: string) =>
	TitleFormat(str)
		.replace(/ Da /g, " da ")
		.replace(/ De /g, " de ")
		.replace(/ Di /g, " di ")
		.replace(/ Do /g, " do ")
		.replace(/ Du /g, " du ")
		.replace(/ Das /g, " das ")
		.replace(/ Dos /g, " dos ")
		.replace(/ Um /g, " um ")
		.replace(/ Uns /g, " uns ")
		.replace(/ Del /g, " del ");

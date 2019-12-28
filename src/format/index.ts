type TypeSeparator = { text: string; separator: string };
export type Mask = {
	text: string;
	pad: number;
	maskStr?: string;
};

export const GetChars = (string: string = "") => string.split("");

export const ReverseString = (string: string = "") =>
	GetChars(string)
		.reverse()
		.join("");

export const FormatCardNumber = (card: string = "") => card.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, "$1 $2 $3 $4").trim();

const convert = (doc: TypeSeparator) =>
	doc.text
		.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)!
		.map((x) => x.toLowerCase())
		.join(doc.separator);

export const Sneakize = (text: string, isUpper = false) => {
	const sneak = convert({ separator: "_", text });
	return isUpper ? sneak.toLocaleUpperCase() : sneak;
};

export const Slugify = (text: string, isUpper = false) => {
	const slug = convert({ separator: "-", text });
	return isUpper ? slug.toLocaleUpperCase() : slug;
};

/*
    No browser, a API de Intl usa o carácter 160(&nbsp ou Non-breaking space) da tabela ASCII,
    quebrando toda comparação feita com o carácter 32 (espaço).
    Para evitar comparações erradas com espaço, o método Trim irá trocar este carácter por
    espaço (32 ou  ).
*/
export const Trim = (text: string) =>
	text
		.replace(/\u00A0/g, " ")
		.trim()
		.replace(/\s\s+/g, " ");

export const TitleFormat = (str: string, preserve = false) => {
	const words = str.split(" ");
	const title = words.reduce((acc: string, curr: string) => {
		const first = curr.substring(0, 1).toUpperCase();
		const second = curr.substring(1);
		return preserve ? `${acc}${first}${second} ` : `${acc}${first}${second.toLowerCase()} `;
	}, "");
	return Trim(title);
};

export const ReplaceAll = (text: string, expression: string, newValue: string) => text.replace(new RegExp(expression, "g"), newValue);

export const CamelCase = (text: string) => {
	const s = text
		.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)!
		.map((x) => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase())
		.join("");
	return s.slice(0, 1).toLowerCase() + s.slice(1);
};

export const HideMask = (text: string, padding: string, maskChar = "*") => `${text}`.slice(-padding).padStart(`${text}`.length, maskChar);

export const Capitalize = (chars: string) => chars.charAt(0).toUpperCase() + chars.substring(1).toLowerCase();

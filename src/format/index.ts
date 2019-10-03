type TypeSeparator = { text: string; separator: string };


export const FormatCardNumber = (card: string = "") =>
	card.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, "$1 $2 $3 $4").trim();

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

export const Trim = (text: string) => text.trim().replace(/\s\s+/g, " ");

export function TitleFormat(str: string, preserve = false) {
	const words = str.split(" ");
	const title = words.reduce((acc: string, curr: string) => {
		const first = curr.substring(0, 1).toUpperCase();
		const second = curr.substring(1);
		return preserve ? `${acc}${first}${second} ` : `${acc}${first}${second.toLowerCase()} `;
	}, "");
	return Trim(title);
}

export const ReplaceAll = (text: string, expression: string, newValue: string) =>
	text.replace(new RegExp(expression, "g"), newValue);

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

export const CamelCase = (text: string) => {
	const s = text
		.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)!
		.map((x) => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase())
		.join("");
	return s.slice(0, 1).toLowerCase() + s.slice(1);
};

export interface IMask {
	text: string;
	pad: number;
	maskStr?: string;
}

export const HideMask = (text: string, padding: string, maskChar = "*") =>
	`${text}`.slice(-padding).padStart(`${text}`.length, maskChar);

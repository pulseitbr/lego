import { Trim } from "../format";

export const copyToClipboard = (id: string) => {
	const text: any = document.getElementById(id);
	text.select();
	document.execCommand("copy");
	text.blur();
};

export const sanitizeHtml = (dom: string) => Trim(dom.replace(/<[^>]*>/g, ""));

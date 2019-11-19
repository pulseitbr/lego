export const downloadBlob = (filename: string, blob: Blob) => {
	const link = document.createElement("a");
	link.href = window.URL.createObjectURL(new Blob([blob]));
	link.setAttribute("download", filename);
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
};

export const copyToClipboard = (copyString: string) => {
	const el = document.createElement("textarea");
	el.value = copyString;
	el.setAttribute("readonly", "");
	el.style.position = "absolute";
	el.style.left = "-9999px";
	document.body.appendChild(el);
	el.select();
	document.execCommand("copy");
	document.body.removeChild(el);
};

export const appendElementOnTag = (element: HTMLElement, tag = "head") => {
	document.getElementsByTagName(tag)[0].appendChild(element);
};

export const appendIconLink = (href: string, rel = "icon") => {
	const link = document.createElement("link");
	link.rel = rel;
	link.type = "image/x-icon";
	link.href = href;
	appendElementOnTag(link);
};

export const addMetaTag = (value: string, keyName = "theme-color") => {
	const meta = document.createElement("meta");
	meta.name = keyName;
	meta.content = value;
	appendElementOnTag(meta);
};

type NewStyleSheet = {
	addCssExtension?: boolean;
	baseURL?: string;
};

const stylesheetUrlBase = "https://io.billingpay.com.br/bp/stylesheet/";

export const createStyleSheet = (filename: string, { addCssExtension = true, baseURL = stylesheetUrlBase }: NewStyleSheet) => {
	const file = addCssExtension ? `${filename}.css` : filename;
	const url = `${baseURL.replace(/\/$/, "")}/${file}`;
	const stylesheet = document.createElement("link");
	stylesheet.setAttribute("rel", "stylesheet");
	stylesheet.setAttribute("type", "text/css");
	stylesheet.setAttribute("href", url);
	return stylesheet;
};

export const addStyleSheet = (stylesheet: HTMLLinkElement, tag: "body" | "head" = "body") => {
	appendElementOnTag(stylesheet, tag);
};

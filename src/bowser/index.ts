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

export const appendTagOnHead = (element: HTMLElement) => {
	document.getElementsByTagName("head")[0].appendChild(element);
};

export const appendIconLink = (href: string, rel = "icon") => {
	const link = document.createElement("link");
	link.rel = rel;
	link.type = "image/x-icon";
	link.href = href;
	appendTagOnHead(link);
};
export const addMetaTag = (value: string, keyName = "theme-color") => {
	const meta = document.createElement("meta");
	meta.name = keyName;
	meta.content = value;
	appendTagOnHead(meta);
};

export default {
	addMetaTag,
	appendTagOnHead,
	appendIconLink,
	copyToClipboard,
	downloadBlob
};

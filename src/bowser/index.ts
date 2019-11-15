import HttpClient from "../http-client";

export const getBlob = async (url: string | string, filename: string, fallback: Function) => {
	try {
		const response = await HttpClient.Get(url, { responseType: "blob" });
		const link = document.createElement("a");
		link.href = window.URL.createObjectURL(new Blob([response.data]));
		link.setAttribute("download", filename);
		document.body.appendChild(link);
		link.click();
		return Promise.resolve({
			ok: true,
			file: filename
		});
	} catch (error) {
		return Promise.reject(fallback());
	}
};

export const copyToClipboard = (str: string) => {
	const el = document.createElement("textarea");
	el.value = str;
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

export const styleConsole = (text: string, color = "red", fontSize = "58") => {
	console.log(`%c${text}`, `color: ${color};font-size: ${fontSize}px;`);
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
	appendIconLink,
	styleConsole,
	copyToClipboard,
	getBlob,
	appendTagOnHead
};

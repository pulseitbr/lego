export const bodyWidth = document.body.clientWidth;
export const bodyHeight = document.body.clientHeight;
export const htmlWidth = document.documentElement.clientWidth;
export const htmlHeight = document.documentElement.clientHeight;
export const windowWidth = window.innerWidth;
export const windowHeight = window.innerHeight;

export const HtmlWindow = {
	height: windowHeight,
	width: windowWidth,
	ref: window
};
export const HTML = {
	height: htmlHeight,
	width: htmlWidth,
	ref: document.querySelector(":root")! as Element
};

export const HtmlBody = {
	height: bodyHeight,
	width: bodyWidth,
	ref: document.body
};

export default {
	Body: HtmlBody,
	Window,
	HTML
};

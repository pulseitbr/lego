export const urlOnlyParameters = (urlString: string) => {
	const matches = urlString.match(/[^&?]*?=[^&?]*/g);
	if (!!matches) {
		return matches;
	}
	return [];
};

export const splitUrlValues = (param: string): string[] => param.split("=");

export const getUrlParameters = (urlString: string) => urlString.split("&");

export const parameterKeyAndValue = (parameter: string): string[][] => getUrlParameters(parameter).map(splitUrlValues);

export const urlParameters = (urlString: string) => {
	const arr = urlOnlyParameters(urlString);
	if (Array.isArray(arr)) {
		return arr
			.map((parameter) => new Set(parameterKeyAndValue(parameter)))
			.reduce((acc, el) => {
				const [name, value] = el.values().next().value;
				try {
					return { ...acc, [name]: JSON.parse(value) };
				} catch (error) {
					return { ...acc, [name]: value };
				}
			}, {});
	}
	return {};
};

export const urlProtocol = (urlString = "") => urlString.split("://")[0];

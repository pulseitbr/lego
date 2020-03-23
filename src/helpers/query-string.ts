export const UrlOnlyParameters = (urlString: string) => {
	const matches = urlString.match(/[^&?]*?=[^&?]*/g);
	if (!!matches) {
		return matches;
	}
	return [];
};

export const SplitUrlValues = (param: string): string[] => param.split("=");

export const GetUrlParameters = (urlString: string) => urlString.split("&");

export const UrlKeyValue = (parameter: string): string[][] => GetUrlParameters(parameter).map(SplitUrlValues);

type QueryObject = { [key: string]: unknown };

const QueryParameters = (acc: QueryObject, el: string[][]) => {
	const [name, value] = el.values().next().value;
	try {
		return { ...acc, [name]: JSON.parse(value) };
	} catch (error) {
		return { ...acc, [name]: value };
	}
};

export const UrlParameters = <T>(urlString: string): QueryObject | T => {
	const arr = UrlOnlyParameters(urlString);
	return Array.isArray(arr) ? arr.map(UrlKeyValue).reduce(QueryParameters, {}) : {};
};

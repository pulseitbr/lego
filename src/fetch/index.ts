const responseTypes = [["json", "application/json"], ["text", "text/"], ["formData", "multipart/form-data"], ["arrayBuffer", "*/*"], ["blob", "*/*"]];

const defineParserFromMimeType = (value: string | undefined | null = "") => {
	if (value === undefined || value === null) {
		return "blob";
	}
	for (const tuple of responseTypes) {
		const [type, headerPattern] = tuple;
		if (value.indexOf(type)) {
			return headerPattern;
		}
	}
	return "blob";
};

const parseBodyRequest = (body: any) => {
	if (body === undefined || body === null) {
		return null;
	}
	if (Array.isArray) {
		return JSON.stringify(body);
	}
	if (body.toString() === "[Object object]") {
		return JSON.stringify(body);
	}
	return body;
};

// type ResponseFetch = {
// 	ok: boolean;
// 	data: any;
// 	headers: any;
// 	status: number;
// 	statusText: string | null;
// };

type RequestConfig = {
	responseType: string;
	headers: { [key: string]: string };
	authorization?: string | null | undefined;
	method: "GET" | "POST" | "PUT" | "DELETE";
} & RequestInit;

type TypeHeaders = { [key: string]: string };

const Fetch = async <T>(url: string, body: T, config: RequestConfig) => {
	const exec = () =>
		new Promise(async (resolve, reject) => {
			const { headers = {} as TypeHeaders, ...configRest } = config;
			// const headers: TypeHeaders = config.headers || {};
			const response = await fetch(url, {
				body: parseBodyRequest(body),
				headers: {
					"User-Agent": "hermes-http",
					connection: "keep-alive",
					Accept: "application/json, text/plain, */*",
					"Accept-Encoding": "gzip, deflate, br",
					"Accept-Language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
					...headers
				},
				redirect: "follow",
				credentials: "same-origin",
				keepalive: false,
				mode: "cors",
				cache: "default",
				method: config.method,
				...configRest
			});
			const contentType = defineParserFromMimeType(response.headers.get("Content-Type"));
			if (response.ok) {
				const bodyData = await response[contentType]();
				return resolve({
					ok: response.ok,
					data: bodyData as any,
					headers: { ...response.headers, "Content-Length": bodyData.length },
					status: response.status,
					statusText: response.statusText
				});
			}
			return reject({
				ok: response.ok,
				data: (await response[contentType]()) as any,
				headers: { ...response.headers, "Content-Length": 0 },
				status: response.status,
				statusText: response.statusText
			});
		});

	return {
		exec
	};
};

Fetch.get = async (url: string, config: any) => Fetch(url, undefined, config);
Fetch.Get = Fetch.get;

Fetch.post = async (url: string, body: any, config: any) => Fetch(url, body, { ...config, method: "POST" });
Fetch.Post = Fetch.post;

Fetch.put = async (url: string, body: any, config: any) => Fetch(url, body, { ...config, body, method: "PUT" });
Fetch.Put = Fetch.put;

Fetch.patch = async (url: string, body: any, config: any) => Fetch(url, body, { ...config, body, method: "PATCH" });
Fetch.Patch = Fetch.patch;

Fetch.delete = async (url: string, config: any) => Fetch(url, undefined, { ...config, method: "DELETE" });
Fetch.Delete = Fetch.delete;

export default Fetch;

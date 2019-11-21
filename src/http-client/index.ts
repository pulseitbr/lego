import Header, { HeaderPropsConstructor } from "./header";

type ResponseFetch = {
	ok: boolean;
	data: unknown;
	headers: any;
	status: number;
	statusText: string | null;
};

type HttpMethods = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "OPTIONS" | "HEAD";

type Cache = "default" | "no-store" | "reload" | "no-cache" | "force-cache" | "only-if-cached" | undefined;

type Credentials = "same-origin" | "omit" | "include" | undefined;

type ModeRequest = "same-origin" | "cors" | "navigate" | "no-cors" | undefined;

type Redirect = "follow" | "error" | "manual" | undefined;

type RequestInterceptorParameter = {
	body: any;
	headers: {};
	redirect: Redirect;
	credentials: Credentials;
	keepalive: boolean;
	referrer: string;
	mode: ModeRequest;
	cache: Cache;
	method: HttpMethods;
	url: string;
};
type RequestInterceptors = (request: RequestInterceptorParameter) => Promise<boolean>;
type ResponseInterceptors = (response: ResponseFetch) => Promise<void>;

type RequestParameters = {
	retryCodes?: number;
	retries?: number;
	controller?: AbortController;
	timeout?: number;
	retryAfter?: number;
};
type RequestConfig = {
	timeout?: number;
	retryStatusCode?: number[];
	requestInterceptors?: RequestInterceptors[];
	responseInterceptors?: ResponseInterceptors[];
	responseType?: string;
	throwOnHttpError?: boolean;
	headers?: HeaderPropsConstructor;
	authorization?: string | null | undefined;
} & RequestInit;

const timeoutError = {
	error: "timeout",
	ok: false,
	data: null,
	headers: {},
	status: 0,
	statusText: ""
};

const responseTypes = [
	["json", "application/json"],
	["text", "text/"],
	["formData", "multipart/form-data"],
	["arrayBuffer", "*/*"],
	["blob", "*/*"]
];

const defineParserFromMimeType = (value: string | undefined | null = "") => {
	if (value === undefined || value === null) {
		return "blob";
	}
	for (const tuple of responseTypes) {
		const [type] = tuple;
		if (value.indexOf(type)) {
			return type;
		}
	}
	return "blob";
};

const parseBodyRequest = (body: Object | any) => {
	if (body === undefined || body === null) {
		return null;
	}
	if (Array.isArray(body)) {
		return JSON.stringify(body);
	}
	if (body.toString() === "[Object object]") {
		return JSON.stringify(body);
	}
	return body;
};

const getItem = (config: RequestConfig | undefined, item: keyof RequestConfig, def?: any) => config![item] ?? def;

const defaultStatusCodeRetry = [408, 413, 429, 500, 502, 503, 504];

type HttpClientReturn = {
	get: (url: string, params?: RequestParameters) => Promise<any>;
	put: <T>(url: string, body: T, params?: RequestParameters) => Promise<any>;
	post: <T>(url: string, body: T, params?: RequestParameters) => Promise<any>;
	patch: <T>(url: string, body: T, params?: RequestParameters) => Promise<any>;
	delete: <T>(url: string, body?: T, params?: RequestParameters) => Promise<any>;
	throwOnHttpError: (isThrow: boolean) => HttpClientReturn;
	getRetryCodes: () => number[];
	addRetryCodes: (code: number) => HttpClientReturn;
	requestInterceptor: (interceptorFunction: RequestInterceptors) => HttpClientReturn;
	responseInterceptor: (interceptorFunction: ResponseInterceptors) => HttpClientReturn;
	addHeader: (key: string, value: string) => HttpClientReturn;
	setAuthorization: (token: string) => HttpClientReturn;
	getAuthorization: (key: string) => string;
	getHeader: (key: string) => HttpClientReturn;
};

const HttpClient = (configuration: RequestConfig = {}) => {
	let abortRequest = false;
	const headers = getItem(configuration, "headers", {});
	let throwOnHttpError = getItem(configuration, "throwOnHttpError", true);
	let globalTimeout = getItem(configuration, "timeout", 0);
	let globalRetryCodes = getItem(configuration, "retryStatusCode", defaultStatusCodeRetry);
	const header = new Header({
		...headers,
		"User-Agent": "hermes-http",
		connection: "keep-alive",
		Accept: "application/json, text/plain, */*",
		"Accept-Encoding": "gzip, deflate, br",
		"Accept-Language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7"
	});

	const requestInterceptors: RequestInterceptors[] = getItem(configuration, "requestInterceptors", []);
	const responseInterceptors: ResponseInterceptors[] = getItem(configuration, "responseInterceptors", []);

	const requestMethod = <T>({
		url,
		body,
		method = "GET",
		retries,
		// isFirst = false,
		retryOnCodes,
		retryAfter = 0,
		signal
	}: {
		isFirst: boolean;
		retryAfter: number;
		url: string;
		body: T | null;
		method: HttpMethods;
		retries: number;
		retryOnCodes: number[];
		signal?: AbortSignal;
	}): Promise<ResponseFetch> => {
		return new Promise(async (resolve, reject) => {
			const request = {
				signal,
				body: parseBodyRequest(body),
				headers: header.getPlainHeaders(),
				redirect: "follow" as Redirect,
				credentials: "same-origin" as Credentials,
				keepalive: false,
				referrer: "origin",
				mode: "cors" as ModeRequest,
				cache: "default" as Cache,
				method
			};
			for (const callback of requestInterceptors) {
				try {
					const promiseValue = await callback({ ...request, url });
					abortRequest = !promiseValue;
				} catch (error) {
					abortRequest = !error;
				}
			}
			if (abortRequest) {
				const bodyError = { ...timeoutError, error: "Abort Request" };
				return throwOnHttpError ? reject(bodyError) : resolve(bodyError);
			}
			const response = await fetch(url, request);
			const contentType = defineParserFromMimeType(response.headers.get("Content-Type"));
			const bodyData = await response[contentType]();
			if (response.ok) {
				const responseHeaders = {};
				response.headers.forEach((value, key) => {
					responseHeaders[key] = value;
				});
				const responseReturn = {
					headers: responseHeaders,
					error: null,
					ok: response.ok,
					data: bodyData,
					status: response.status,
					statusText: response.statusText
				};
				responseInterceptors.forEach((callback) => callback(responseReturn));
				return resolve(responseReturn);
			}
			const bodyError = {
				data: bodyData,
				error: response.statusText ?? response.status ?? "",
				headers: { ...response.headers, "Content-Length": 0 },
				ok: response.ok,
				status: response.status,
				statusText: response.statusText,
			};
			if (responseInterceptors !== null) {
				responseInterceptors.forEach((callback) => callback(bodyError));
			}
			if (retries === 1) {
				return throwOnHttpError ? reject(bodyError) : resolve(bodyError);
			}
			setTimeout(
				() =>
					requestMethod({ url, retryAfter, body, method, retries: retries - 1, retryOnCodes, isFirst: false })
						.then(resolve)
						.catch(reject),
				retryAfter
			);
		});
	};

	const exec = async <T>(url: string, body: T | null, method: HttpMethods = "GET", params: RequestParameters): Promise<ResponseFetch | unknown> => {
		const { retries = 0, controller = new AbortController(), timeout = globalTimeout, retryCodes = globalRetryCodes, retryAfter = 0 } = params;
		const signal = controller.signal;
		const parameters = { url, body, method, retries, isFirst: true, retryOnCodes: retryCodes, signal, retryAfter };
		if (timeout <= 0) {
			return requestMethod(parameters);
		}
		return Promise.race([
			requestMethod(parameters),
			new Promise((_, reject) =>
				setTimeout(() => {
					controller.abort();
					reject(timeoutError);
				}, timeout)
			)
		]);
	};

	const httpClientMethods: HttpClientReturn = {
		get: (url: string, params: RequestParameters = {}) => exec(url, null, "GET", params),
		put: <T>(url: string, body: T, params: RequestParameters = {}) => exec(url, body, "PUT", params),
		post: <T>(url: string, body: T, params: RequestParameters = {}) => exec(url, body, "POST", params),
		patch: <T>(url: string, body: T, params: RequestParameters = {}) => exec(url, body, "PATCH", params),
		delete: <T>(url: string, body?: T, params: RequestParameters = {}) => exec(url, body, "DELETE", params),
		throwOnHttpError(isThrow: boolean) {
			throwOnHttpError = isThrow;
			return httpClientMethods;
		},
		getRetryCodes() {
			return [...globalRetryCodes];
		},
		addRetryCodes(code: number) {
			globalRetryCodes.push(code);
			return httpClientMethods;
		},
		requestInterceptor(interceptorFunction: RequestInterceptors) {
			requestInterceptors.push(interceptorFunction);
			return httpClientMethods;
		},
		responseInterceptor(interceptorFunction: ResponseInterceptors) {
			responseInterceptors.push(interceptorFunction);
			return httpClientMethods;
		},
		addHeader(key: string, value: string) {
			header.addHeader(key, value);
			return httpClientMethods;
		},
		setAuthorization(token: string) {
			header.addAuthorization(token);
			return httpClientMethods;
		},
		getAuthorization: (key: string = "Authorization") => header.getHeader(key) || "",
		getHeader(key: string) {
			header.getHeader(key);
			return httpClientMethods;
		}
	};
	return httpClientMethods;
};

HttpClient.get = HttpClient().get;
HttpClient.post = HttpClient().post;
HttpClient.patch = HttpClient().patch;
HttpClient.put = HttpClient().put;
HttpClient.delete = HttpClient().delete;
HttpClient.create = HttpClient;

export default HttpClient;

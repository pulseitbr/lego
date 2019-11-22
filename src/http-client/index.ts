import Header, { HeaderPropsConstructor } from "./header";

type ResponseFetch = Response & {
	data: unknown;
	error: string | number | null;
	headers: Headers;
	ok: boolean;
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
	cache: Cache;
	credentials: Credentials;
	headers: Headers;
	keepalive: boolean;
	method: HttpMethods;
	mode: ModeRequest;
	redirect: Redirect;
	referrer: string;
	url: string;
};

type RequestInterceptorReturnType = Promise<{
	abort?: boolean;
	request: {
		body: any;
		cache: Cache;
		credentials: Credentials;
		headers: Headers;
		keepalive: boolean;
		method: HttpMethods;
		mode: ModeRequest;
		redirect: Redirect;
		referrer: string;
		signal?: AbortSignal;
		url: string;
	};
}>;

type RequestInterceptors = (request: RequestInterceptorParameter) => RequestInterceptorReturnType;

type ResponseInterceptors = (response: ResponseFetch) => Promise<ResponseFetch>;

type RequestParameters = Partial<{
	headers: Headers;
	controller: AbortController;
	retries: number;
	retryAfter: number;
	retryCodes: number[];
	timeout: number;
	rejectBase: boolean;
}>;

type RequestConfig = RequestInit &
	Partial<{
		authorization: string | null | undefined;
		baseUrl: string;
		headers: HeaderPropsConstructor;
		requestInterceptors: RequestInterceptors[];
		responseInterceptors: ResponseInterceptors[];
		responseType: string;
		retryStatusCode: number[];
		throwOnHttpError: boolean;
		timeout: number;
	}>;

type HttpClientReturn = {
	addHeader: (key: string, value: string) => HttpClientReturn;
	addRetryCodes: (code: number) => HttpClientReturn;
	delete: <T>(url: string, body?: T, params?: RequestParameters) => Promise<ResponseFetch | unknown>;
	get: (url: string, params?: RequestParameters) => Promise<ResponseFetch | unknown>;
	getAuthorization: (key: string) => string;
	getHeader: (key: string) => HttpClientReturn;
	getRetryCodes: () => number[];
	patch: <T>(url: string, body: T, params?: RequestParameters) => Promise<ResponseFetch | unknown>;
	post: <T>(url: string, body: T, params?: RequestParameters) => Promise<ResponseFetch | unknown>;
	put: <T>(url: string, body: T, params?: RequestParameters) => Promise<ResponseFetch | unknown>;
	requestInterceptor: (interceptorFunction: RequestInterceptors) => HttpClientReturn;
	responseInterceptor: (interceptorFunction: ResponseInterceptors) => HttpClientReturn;
	setAuthorization: (token: string) => HttpClientReturn;
	throwOnHttpError: (isThrow: boolean) => HttpClientReturn;
};

const timeoutError = {
	data: null,
	error: "timeout",
	headers: {},
	ok: false,
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

const defaultStatusCodeRetry = [408, 413, 429, 500, 502, 503, 504];

const resolveUrl = (base: string, uri: string) => (uri ? `${base.replace(/\/+$/, "")}/${uri.replace(/^\/+/, "")}` : base);

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

const mutateResponse = async <T extends Function>(response: ResponseFetch, interceptors: T[]): Promise<ResponseFetch> => {
	for (const callback of interceptors) {
		try {
			const responseMutate = await callback(response);
			response = { ...response, ...responseMutate };
		} catch (error) {
			response = { ...response, ...error };
		}
	}
	return response;
};

const HttpClient = (configuration: RequestConfig = {}) => {
	const defaultHeaders = getItem(configuration, "headers", {});
	let abortRequest = false;
	let throwOnHttpError = getItem(configuration, "throwOnHttpError", true);
	let baseUrl = getItem(configuration, "baseUrl", "");
	let globalTimeout = getItem(configuration, "timeout", 0);
	let globalRetryCodes = getItem(configuration, "retryStatusCode", defaultStatusCodeRetry);

	const header = new Header({
		...defaultHeaders,
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
		rejectBase,
		headers,
		retryOnCodes,
		retryAfter = 0,
		signal
	}: {
		retryAfter: number;
		rejectBase: boolean;
		url: string;
		body: T | null;
		method: HttpMethods;
		retries: number;
		headers: Headers;
		retryOnCodes: number[];
		signal?: AbortSignal;
	}): Promise<Response> => {
		return new Promise(async (resolve, reject) => {
			headers.forEach((value, key) => {
				header.getHeaders().set(key, value);
			});
			let request = {
				body: parseBodyRequest(body),
				cache: "no-store" as Cache,
				credentials: "same-origin" as Credentials,
				headers: header.getHeaders(),
				keepalive: false,
				method,
				mode: "cors" as ModeRequest,
				redirect: "follow" as Redirect,
				referrer: "no-referrer",
				signal
			};

			for (const callback of requestInterceptors) {
				try {
					const promiseValue = await callback({ ...request, url });
					request = { ...request, ...promiseValue.request };
					abortRequest = promiseValue.abort ?? false;
				} catch (error) {
					request = { ...request, ...error.request };
					abortRequest = error.abort ?? false;
				}
			}

			if (abortRequest) {
				const bodyError = new Response();
				return throwOnHttpError ? reject(bodyError) : resolve(bodyError);
			}

			const requestUrl = rejectBase ? url : resolveUrl(baseUrl, url);

			let response = (await fetch(requestUrl, request)) as ResponseFetch;

			const contentType = defineParserFromMimeType(response.headers.get("Content-Type"));
			const bodyData = await response[contentType]();

			const responseHeaders = new Headers();

			response.headers.forEach((value, key) => {
				responseHeaders[key] = value;
			});

			if (response.ok) {
				let responseReturn = {
					data: bodyData,
					error: null,
					headers: responseHeaders,
					ok: response.ok,
					status: response.status,
					statusText: response.statusText
				} as ResponseFetch;
				return resolve(mutateResponse(responseReturn, responseInterceptors));
			}
			let bodyError = {
				data: bodyData,
				error: response.statusText ?? response.status ?? "",
				headers: responseHeaders,
				ok: response.ok,
				status: response.status,
				statusText: response.statusText
			} as ResponseFetch;
			bodyError = await mutateResponse(bodyError, responseInterceptors);

			if (retries === 1) {
				return throwOnHttpError ? reject(bodyError) : resolve(bodyError);
			}
			setTimeout(
				() =>
					requestMethod({
						rejectBase,
						url,
						headers,
						retryAfter,
						body,
						method,
						retries: retries - 1,
						retryOnCodes: retryOnCodes.concat(globalRetryCodes)
					})
						.then(resolve)
						.catch(reject),
				retryAfter
			);
		});
	};

	const exec = async <T>(
		url: string,
		body: T | null,
		method: HttpMethods = "GET",
		{
			rejectBase = false,
			retries = 0,
			controller = new AbortController(),
			timeout = globalTimeout,
			retryCodes = globalRetryCodes,
			headers = new Headers(),
			retryAfter = 0
		}: RequestParameters
	): Promise<ResponseFetch | unknown> => {
		const signal = controller.signal;
		const parameters = { url, body, method, retries, isFirst: true, retryOnCodes: retryCodes, signal, retryAfter, headers, rejectBase };
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
		addRetryCodes(...code: number[]) {
			code.forEach(globalRetryCodes.push);
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
	return Object.freeze(httpClientMethods);
};

HttpClient.get = HttpClient().get;
HttpClient.post = HttpClient().post;
HttpClient.patch = HttpClient().patch;
HttpClient.put = HttpClient().put;
HttpClient.delete = HttpClient().delete;
HttpClient.create = HttpClient;

export default HttpClient;

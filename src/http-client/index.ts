import Header, { HeaderPropsConstructor } from "./Header";

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
	signal: AbortSignal | null | undefined;
	mode: ModeRequest;
	cache: Cache;
	method: HttpMethods;
	url: string;
};
type RequestInterceptors = (request: RequestInterceptorParameter) => Promise<boolean>;
type ResponseInterceptors = (response: ResponseFetch) => Promise<void>;

type RequestConfig = {
	requestInterceptors?: RequestInterceptors[];
	responseInterceptors?: ResponseInterceptors[];
	responseType?: string;
	throwOnHttpError?: boolean;
	headers?: HeaderPropsConstructor;
	authorization?: string | null | undefined;
} & RequestInit;

const responseTypes = [["json", "application/json"], ["text", "text/"], ["formData", "multipart/form-data"], ["arrayBuffer", "*/*"], ["blob", "*/*"]];

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
	if (Array.isArray) {
		return JSON.stringify(body);
	}
	if (body.toString() === "[Object object]") {
		return JSON.stringify(body);
	}
	return body;
};

const getItem = <T>(configuration: RequestConfig | undefined, item: keyof RequestConfig, defaultValue: any = undefined) =>
	!!configuration ? (configuration[item] as T) : defaultValue;

const HttpClient = (configuration?: RequestConfig) => {
	let abortRequest = false;
	const headers = getItem(configuration, "headers", {});
	let throwOnHttpError = getItem(configuration, "throwOnHttpError", true);
	const header = new Header({
		...headers,
		"User-Agent": "hermes-http",
		connection: "keep-alive",
		Accept: "application/json, text/plain, */*",
		"Accept-Encoding": "gzip, deflate, br",
		"Accept-Language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7"
	});

	const requestInterceptors: RequestInterceptors[] = getItem(configuration, "requestInterceptors", undefined);
	const responseInterceptors: ResponseInterceptors[] = getItem(configuration, "responseInterceptors", undefined);

	const exec = <T>(url: string, body: T | null, method: HttpMethods = "GET"): Promise<ResponseFetch> => {
		return new Promise(async (resolve, reject) => {
			const request = {
				body: parseBodyRequest(body),
				headers: header.getPlainHeaders(),
				redirect: "follow" as Redirect,
				credentials: "same-origin" as Credentials,
				keepalive: false,
				referrer: "origin",
				signal: <undefined>getItem(configuration, "signal", undefined) || undefined,
				mode: "cors" as ModeRequest,
				cache: "default" as Cache,
				method
			};
			if (requestInterceptors !== undefined) {
                for(const callback of requestInterceptors){
					try {
						const promiseValue = await callback({ ...request, url });
						abortRequest = !promiseValue;
					} catch (error) {
						abortRequest = !error;
					}
                }
			}
			if (abortRequest) {
				const bodyError = {
					ok: false,
					data: undefined,
					headers: {},
					status: 0,
					statusText: ""
				};
				return throwOnHttpError ? reject(bodyError) : resolve(bodyError);
			}
			const response = await fetch(url, request);
			const contentType = defineParserFromMimeType(response.headers.get("Content-Type"));
			const bodyData = await response[contentType]();
			if (response.ok) {
				const responseReturn = {
					ok: response.ok,
					data: bodyData,
					headers: { ...response.headers, "Content-Length": bodyData.length },
					status: response.status,
					statusText: response.statusText
				};
				if (responseInterceptors !== undefined) {
					responseInterceptors.forEach((callback) => callback(responseReturn));
				}
				return resolve(responseReturn);
			}
			const bodyError = {
				ok: response.ok,
				data: bodyData,
				headers: { ...response.headers, "Content-Length": 0 },
				status: response.status,
				statusText: response.statusText
			};
			if (responseInterceptors !== undefined) {
				responseInterceptors.forEach((callback) => callback(bodyError));
			}
			return throwOnHttpError ? reject(bodyError) : resolve(bodyError);
		});
	};

	return {
		post: <T>(url: string, body: T) => exec(url, body, "POST"),
		get: (url: string) => exec(url, null, "GET"),
		put: <T>(url: string, body: T) => exec(url, body, "PUT"),
		patch: <T>(url: string, body: T) => exec(url, body, "PATCH"),
		delete: (url: string) => exec(url, null, "DELETE"),
		throwOnHttpError: (isThrow: boolean) => {
			throwOnHttpError = isThrow;
			return throwOnHttpError;
		},
		request: exec,
		addHeader: (key: string, value: string) => header.addHeader(key, value),
		setAuthorization: (token: string) => header.addAuthorization(token)
	};
};

export default HttpClient;

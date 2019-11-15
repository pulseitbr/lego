import { AnyText } from "../typings";

export type HeaderPropsConstructor = { [key: string]: AnyText };

class Header {
	public headers: Headers;
	constructor(headers: HeaderPropsConstructor & any) {
		this.headers = new Headers();
		this.headers.append("User-Agent", "hermes-http");
		this.headers.append("connection", "keep-alive");
		this.headers.append("Accept-Encoding", "gzip, deflate, br");
		Object.entries(headers).forEach(([key, value]) => this.headers.append(key, `${value}`));
	}

	public addAuthorization(token: string, authorizationName = "Authorization") {
		console.log(this);
		this.headers.append(authorizationName, token);
	}

	public addHeader(header: string, value: AnyText = "") {
		this.headers.append(header, `${value}`);
	}

	public getPlainHeaders() {
		const headers = {};
		this.headers.forEach((value, header) => {
			headers[header] = value;
		});
		return headers;
	}
}

export default Header;

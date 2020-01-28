import { UrlParameters } from "./query-string";

export class UrlBuilder {
	private url: URL;
	public constructor(href: string) {
		this.url = new URL(href);
	}
	public addParameter(name: string, value: string) {
		if (!!value) {
			this.url.searchParams.append(name, value);
		}
		return this;
	}
	public removeParameter(name: string) {
		this.url.searchParams.delete(name);
		return this;
	}
	public addUser(user: string) {
		this.url.username = user;
		return this;
	}
	public addPassword(password: string) {
		this.url.password = password;
		return this;
	}
	public setBaseUrl(url: string) {
		this.url.href = url;
		return this;
	}
	public build() {
		return this.url.href;
	}
	public getParameters() {
		return UrlParameters(this.url.href);
	}
}

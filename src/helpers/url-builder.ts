import { UrlParameters } from "./query-string";

export class UrlBuilder {
	private url: URL;
	public constructor(href: string) {
		this.url = new URL(href);
	}
	public AddParameter(name: string, value: string) {
		if (!!value) {
			this.url.searchParams.append(name, value);
		}
		return this;
	}
	public RemoveParameter(name: string) {
		this.url.searchParams.delete(name);
		return this;
	}
	public AddUser(user: string) {
		this.url.username = user;
		return this;
	}
	public AddPassword(password: string) {
		this.url.password = password;
		return this;
	}
	public SetBaseUrl(url: string) {
		this.url.href = url;
		return this;
	}
	public Build() {
		return this.url.href;
	}
	public GetParameters() {
		return UrlParameters(this.url.href);
	}
}

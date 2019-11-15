import { HttpClient, Console } from "lego";
import React from "react";

const hermes = HttpClient({
	requestInterceptors: [
		(request) => {
			if (request.url.indexOf("undefined") > -1) {
				console.log("TEM UNDEFINED");
				return Promise.reject(false);
			}
			return Promise.resolve(true);
		}
	]
});

export default function App() {
	hermes.setAuthorization(
		"eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiI2Y2ZjNjJhMy1hZGMzLTQwODgtOThkMC1lZjAwZDQxYmYyMTQiLCJzdWIiOiIyNTk0NjY5NDA3MyIsIm5vbWUiOiJDbGllbnRlIFBGIDAwMSAwNDEwMTkiLCJwZXJmaXMiOlsiVVNVQVJJTyJdLCJlbWFpbCI6ImNsaWVudGVwajAwMTA0MTAxOUB0ZXN0ZS5jb20uYnIiLCJpYXQiOjE1NzAyMTA1NDksImV4cCI6MTYwMTc0NjU0OX0.3c-l9uGvNwLcisdI0zE7y22Cvc04qoB_kW1jO3wBswrdhh4UJs13PF8qsEqipfCJ6HuEYslCdRQx6jT3yBa6WQ"
	);
	hermes
		.get("https://app.billingpay.com.br/api/cliente/endereco/cliente/500668")
		.then(console.log)
		.catch(Console);
	return <div>AAAAEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE</div>;
}

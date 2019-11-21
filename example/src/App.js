import { HttpClient } from "lego";
import React, { useEffect, useState } from "react";

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
}).setAuthorization(
	"eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiI2Y2ZjNjJhMy1hZGMzLTQwODgtOThkMC1lZjAwZDQxYmYyMTQiLCJzdWIiOiIyNTk0NjY5NDA3MyIsIm5vbWUiOiJDbGllbnRlIFBGIDAwMSAwNDEwMTkiLCJwZXJmaXMiOlsiVVNVQVJJTyJdLCJlbWFpbCI6ImNsaWVudGVwajAwMTA0MTAxOUB0ZXN0ZS5jb20uYnIiLCJpYXQiOjE1NzAyMTA1NDksImV4cCI6MTYwMTc0NjU0OX0.3c-l9uGvNwLcisdI0zE7y22Cvc04qoB_kW1jO3wBswrdhh4UJs13PF8qsEqipfCJ6HuEYslCdRQx6jT3yBa6WQ"
);

export default function App() {
	const [response, setR] = useState("");

	useEffect(() => {
		hermes
			.get("https://app.billingpay.com.br/api/cliente/endereco/cliente/5006680", { retries: 3, retryAfter: 500 })
			.then((e) => {
				console.log("RENDER", e);
				setR(JSON.stringify(e, null, 4));
			})
			.catch((e) => {
				setR(JSON.stringify(e, null, 4));
			});
	}, []);
	return (
		<pre>
			<code>{response}</code>
		</pre>
	);
}

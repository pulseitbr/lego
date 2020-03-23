import { HttpClient } from "lego";
import React, { useEffect, useState } from "react";

const hermes = HttpClient({
	baseUrl: "https://app.billingpay.com.br/api/",
	requestInterceptors: [
		async (request) => {
			return Promise.resolve({
				request
			});
		}
	],
	responseInterceptors: [(value) => Promise.resolve({ ...value, mutate: true })]
}).setAuthorization(
	"eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiI2Y2ZjNjJhMy1hZGMzLTQwODgtOThkMC1lZjAwZDQxYmYyMTQiLCJzdWIiOiIyNTk0NjY5NDA3MyIsIm5vbWUiOiJDbGllbnRlIFBGIDAwMSAwNDEwMTkiLCJwZXJmaXMiOlsiVVNVQVJJTyJdLCJlbWFpbCI6ImNsaWVudGVwajAwMTA0MTAxOUB0ZXN0ZS5jb20uYnIiLCJpYXQiOjE1NzAyMTA1NDksImV4cCI6MTYwMTc0NjU0OX0.3c-l9uGvNwLcisdI0zE7y22Cvc04qoB_kW1jO3wBswrdhh4UJs13PF8qsEqipfCJ6HuEYslCdRQx6jT3yBa6WQ"
);

export default function App() {
	const [response, setR] = useState("");

	useEffect(() => {
		hermes
			.post("/cliente/search", { nome: "fernando", numeroDocumento: "" })
			.then((e) => {
				console.log("API", e);
				setR(JSON.stringify(e, null, 4));
			})
			.catch((e) => {
				console.log(e);
			});
	}, []);
	return (
		<pre>
			<code>{response}</code>
		</pre>
	);
}

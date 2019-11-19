const { FormatBRL, FormatCpf, FormatCep } = require("../dist");

test("BRL Format", () => {
	const format = FormatBRL("20.5").toString();
	const str = "R$ 20,50";
	expect(format).toEqual(str);
});

test("Cep format", () => {
	expect(FormatCep("00000000a")).toEqual("00000-000");
});

test("CPF Format", () => {
	expect(FormatCpf("00000000000")).toEqual("000.000.000-00");
});

const { FormatBRL, FormatCpf, FormatCep } = require("../dist");

test("BRL Format", () => {
	expect(FormatBRL("20.5")).toBe("R$ 20.50");
});

test("Cep format", () => {
	expect(FormatCep("00000000a")).toEqual("00000-000");
});

test("CPF Format", () => {
	expect(FormatCpf("00000000000")).toEqual("000.000.000-00");
});

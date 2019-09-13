import { OnlyNumbers, ToFloat, ToInt } from "../utils";

const ufPerNinthDigit = [
	["RS"], // 0
	["DF", "GO", "MT", "MS", "TO"], // 1
	["AM", "PA", "RR", "AP", "AC", "RO"], // 2
	["CE", "MA", "PI"], // 3
	["PB", "PE", "AL", "RN"], // 4
	["BA", "SE"], // 5
	["MG"], // 6
	["RJ", "ES"], // 7
	["SP"], // 8
	["PR", "SC"] // 9
];

type States =
	| "RS"
	| "DF"
	| "GO"
	| "MT"
	| "MS"
	| "TO"
	| "AM"
	| "PA"
	| "RR"
	| "AP"
	| "AC"
	| "RO"
	| "CE"
	| "MA"
	| "PI"
	| "PB"
	| "PE"
	| "AL"
	| "RN"
	| "BA"
	| "SE"
	| "MG"
	| "RJ"
	| "ES"
	| "SP"
	| "PR"
	| "SC";

export const equals = (target: number | string, intent: number | string) =>
	ToFloat(target.toString()) === ToFloat(intent.toString());

const CpfAlgorithm = (t: string) => {
	const cpf = OnlyNumbers(t);
	let numbers = "";
	let digits = "";
	let sum = 0;
	let i = 0;
	let result = 0;
	let sames = 1;
	if (cpf.length < 11 || cpf === "00000000000") {
		return false;
	}
	for (i = 0; i < cpf.length - 1; i++) {
		if (cpf.charAt(i) !== cpf.charAt(i + 1)) {
			sames = 0;
			break;
		}
	}
	if (!sames) {
		numbers = cpf.substring(0, 9);
		digits = cpf.substring(9);
		sum = 0;
		for (i = 10; i > 1; i--) {
			sum += ToInt(numbers.charAt(10 - i)) * i;
		}
		result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
		if (!equals(result, digits.charAt(0))) {
			return false;
		}
		numbers = cpf.substring(0, 10);
		sum = 0;
		for (i = 11; i > 1; i--) {
			sum += ToInt(numbers.charAt(11 - i)) * i;
		}
		result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
		return equals(result, digits.charAt(1));
	}
	return false;
};

type CPFValidations = {
	validateMask?: boolean;
	validateByStates?: States[];
};

export const CPF_REGEX_USE_MASK = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
export const CPF_REGEX_MAYBE_MASK = /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/;

// ToDo: fazer validação por máscara e por dígito/estado
export const IsCPF = (cpf: string, params?: CPFValidations) => {
	const isCPF = CpfAlgorithm(cpf);
	return isCPF;
};

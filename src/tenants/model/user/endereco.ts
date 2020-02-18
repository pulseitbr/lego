import { Maybe, AnyTextNonBoolean } from "../../../typings";

export class Endereco {
	public readonly nrSeqEndereco: Maybe<number>;
	public readonly cep: string;
	public readonly numero: AnyTextNonBoolean;
	public readonly complemento: string;
	public readonly logradouro: string;
	public readonly bairro: string;
	public readonly cidade: string;
	public readonly uf: string;
	public readonly tipoEndereco: {
		codigo: number;
		descricao: "";
	};
	public readonly tipoLogradouro: {
		id: number;
		descricao: "";
	};

	public constructor(props: Partial<Endereco> = {}) {
		this.bairro = props.bairro || "";
		this.cep = props.cep || "";
		this.cidade = props.cidade || "";
		this.complemento = props.complemento || "";
		this.logradouro = props.logradouro || "";
		this.nrSeqEndereco = props.nrSeqEndereco || 0;
		this.numero = props.numero || "";
		this.uf = props.uf || "";
		this.tipoEndereco = {
			codigo: 1,
			descricao: ""
		};
		this.tipoLogradouro = {
			id: 1,
			descricao: ""
		};
	}
}

import { Maybe, AnyTextNonBoolean } from "../../../typings";

export class Endereco {
	public readonly bairro: string;
	public readonly cep: string;
	public readonly cidade: string;
	public readonly complemento: string;
	public readonly logradouro: string;
	public readonly nrSeqEndereco: Maybe<number>;
	public readonly numero: AnyTextNonBoolean;
	public readonly tipoEndereco: { codigo: number; descricao: "" };
	public readonly tipoLogradouro: { id: number; descricao: "" };
	public readonly uf: string;

	public constructor(props: Partial<Endereco> = {}) {
		this.bairro = props.bairro || "";
		this.cep = props.cep || "";
		this.cidade = props.cidade || "";
		this.complemento = props.complemento || "";
		this.logradouro = props.logradouro || "";
		this.nrSeqEndereco = props.nrSeqEndereco || 0;
		this.numero = props.numero || "";
		this.tipoEndereco = { codigo: 1, descricao: "" };
		this.tipoLogradouro = { id: 1, descricao: "" };
		this.uf = props.uf || "";
	}
}

import ModeloProduto from "./modelo-produto";

export class Cartao {
	public idCliente: number;
	public idTipoPerfilCliente: number;
	public idEmissorMidia: number;
	public numeroLogicoMidia: string;
	public numeroFisicoMidia: string;
	public dataAssociacao: string;
	public cancelado: boolean;
	public dataDesassociacao: string | null;
	public contaFinanceira: string;
	public statusMidia: string;
	public modeloProduto: ModeloProduto;
	public valorRecarga: number;

	public constructor(props: Partial<Cartao> = {}) {
		this.statusMidia = props.statusMidia || "";
		this.modeloProduto = props.modeloProduto || ModeloProduto.Transporte;
		this.cancelado = props.cancelado || false;
		this.idCliente = props.idCliente || 0;
		this.idTipoPerfilCliente = props.idTipoPerfilCliente || 0;
		this.idEmissorMidia = props.idEmissorMidia || 0;
		this.numeroLogicoMidia = props.numeroLogicoMidia || "";
		this.numeroFisicoMidia = props.numeroFisicoMidia || "";
		this.dataAssociacao = props.dataAssociacao || "";
		this.dataDesassociacao = props.dataDesassociacao || "";
		this.contaFinanceira = props.contaFinanceira || "";
		this.valorRecarga = 0.0;
	}
}

export enum CardMeasure {
	minWidth = "302.6px",
	minHeight = "180.1px"
}

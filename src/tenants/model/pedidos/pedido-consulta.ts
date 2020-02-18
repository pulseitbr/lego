import { IdItemPedido, ItemPedido } from "./item-pedido";
import { Maybe } from "../../../typings";
import { Pedido } from "./pedido";

export const StatusPedidoEnum = {
	AGUARDANDO_PAGAMENTO: "AGUARDANDO_PAGAMENTO",
	PAGO_COM_DIFERENCA: "PAGO_COM_DIFERENCA",
	EM_PRODUCAO: "EM_PRODUCAO",
	EM_PREPARO: "EM_PREPARO",
	PRODUZIDO: "PRODUZIDO",
	AGUARDANDO_GERACAO_BOLETO: "AGUARDANDO_GERACAO_BOLETO",
	CANCELADO: "CANCELADO",
	CONCLUIDO: "CONCLUIDO",
	PAGO: "PAGO",
	WAIT: "WAIT"
};

export const ticketOrderView = [StatusPedidoEnum.PAGO, StatusPedidoEnum.PAGO_COM_DIFERENCA, StatusPedidoEnum.PRODUZIDO, StatusPedidoEnum.EM_PRODUCAO];

export type TypeStatusPedido =
	| "AGUARDANDO_GERACAO_BOLETO"
	| "AGUARDANDO_PAGAMENTO"
	| "PAGO_COM_DIFERENCA"
	| "PRODUZIDO"
	| "CANCELADO"
	| "CONCLUIDO"
	| "EM_PRODUCAO"
	| "EM_PREPARO"
	| "PAGO"
	| "WAIT"
	| "";

export class PedidoConsulta {
	public readonly numero: number;
	public readonly idCliente: number;
	public readonly nomeCliente: string;
	public readonly documentoCliente: string;
	public readonly quantidadeItens: number;
	public readonly valorCalculadoPedido: number;
	public readonly statusPedido: TypeStatusPedido;
	public readonly valorPago: number;
	public readonly dataPagamento: string;
	public readonly dataInclusao: string;
	public readonly itensPedido: ItensPedido[];
	public readonly pagamentosPedido: PagamentosPedido[];
	public readonly podeExcluir: boolean;
	public readonly nrSeqEndereco: number;

	public constructor(props: Partial<PedidoConsulta> = {}) {
		this.numero = props.numero || 0;
		this.podeExcluir = !!props.podeExcluir;
		this.idCliente = props.idCliente || 0;
		this.nomeCliente = props.nomeCliente || "";
		this.documentoCliente = props.documentoCliente || "";
		this.quantidadeItens = props.quantidadeItens || 0;
		this.valorCalculadoPedido = props.valorCalculadoPedido || 0;
		this.statusPedido = props.statusPedido || "";
		this.valorPago = props.valorPago || 0;
		this.dataPagamento = props.dataPagamento || "";
		this.dataInclusao = props.dataInclusao || "";
		this.itensPedido = props.itensPedido || [];
		this.pagamentosPedido = props.pagamentosPedido || [];
		this.nrSeqEndereco = props.nrSeqEndereco || 0;
	}
}

export class ItensPedido {
	public numeroItem: Maybe<number>;
	public idCliente: number;
	public usuario: string;
	public cartao: Maybe<string>;
	public valor: number;
	public servico: string;
	public idItemPedido: IdItemPedido;
	public documento: string;
	public valorUsoDiario: Maybe<number>;

	public constructor(props: Partial<ItensPedido> = {}) {
		this.valor = props.valor || 0;
		this.cartao = props.cartao || "";
		this.servico = props.servico || "";
		this.usuario = props.usuario || "";
		this.idCliente = props.idCliente || 0;
		this.documento = props.documento || "";
		this.numeroItem = props.numeroItem || 0;
		this.idItemPedido = props.idItemPedido || 0;
		this.valorUsoDiario = props.valorUsoDiario || 0;
	}
}

export class PagamentosPedido {
	public readonly valorPago: number;
	public readonly dataPagamento: string;
	public readonly formaPagamento: string;
	public readonly identificador: string;
	public readonly dataBaixa: string;
	public readonly tipoBaixa: string;
	public readonly usuario: string;

	public constructor() {
		this.valorPago = 0;
		this.dataPagamento = "";
		this.formaPagamento = "";
		this.identificador = "";
		this.dataBaixa = "";
		this.tipoBaixa = "";
		this.usuario = "";
	}
}

export const createOrderItemFromQueryOrderItem = (item: ItensPedido, order: Pedido, remove = false) =>
	new ItemPedido({
		idItem: item.numeroItem,
		idPedido: order.numero,
		valorCredito: item.valor,
		numeroLogicoMidia: item.cartao ?? "",
		excluir: remove,
		idTipoItemPedido: item.idItemPedido
	});

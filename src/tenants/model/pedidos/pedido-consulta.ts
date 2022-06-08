import { Maybe } from "../../../typings";
import { IdItemPedido, IdItemBeneficio, ItemPedido } from "./item-pedido";
import { Pedido } from "./pedido";

export const StatusPedidoEnum = {
	AGUARDANDO_GERACAO_BOLETO: "AGUARDANDO_GERACAO_BOLETO",
	AGUARDANDO_PAGAMENTO: "AGUARDANDO_PAGAMENTO",
	CANCELADO: "CANCELADO",
	CONCLUIDO: "CONCLUIDO",
	EM_PREPARO: "EM_PREPARO",
	EM_PRODUCAO: "EM_PRODUCAO",
	PAGO_COM_DIFERENCA: "PAGO_COM_DIFERENCA",
	PAGO: "PAGO",
	PRODUZIDO: "PRODUZIDO",
	WAIT: "WAIT"
};

export const ticketOrderView = [StatusPedidoEnum.PAGO, StatusPedidoEnum.PAGO_COM_DIFERENCA, StatusPedidoEnum.PRODUZIDO, StatusPedidoEnum.EM_PRODUCAO];

export type TypeStatusPedido =
	| "AGUARDANDO_GERACAO_BOLETO"
	| "AGUARDANDO_PAGAMENTO"
	| "CANCELADO"
	| "CONCLUIDO"
	| "EM_PREPARO"
	| "EM_PRODUCAO"
	| "PAGO_COM_DIFERENCA"
	| "PAGO"
	| "PRODUZIDO"
	| "WAIT"
	| "";

export class PedidoConsulta {
	public readonly dataInclusao: string;
	public readonly dataPagamento: string;
	public readonly documentoCliente: string;
	public readonly idCliente: number;
	public readonly itensPedido: ItensPedido[];
	public readonly nomeCliente: string;
	public readonly nrSeqEndereco: number;
	public readonly numero: number;
	public readonly pagamentosPedido: PagamentosPedido[];
	public readonly podeExcluir: boolean;
	public readonly quantidadeItens: number;
	public readonly statusPedido: TypeStatusPedido;
	public readonly valorCalculadoPedido: number;
	public readonly valorPago: number;

	public constructor(props: Partial<PedidoConsulta> = {}) {
		this.dataInclusao = props.dataInclusao || "";
		this.dataPagamento = props.dataPagamento || "";
		this.documentoCliente = props.documentoCliente || "";
		this.idCliente = props.idCliente || 0;
		this.itensPedido = props.itensPedido || [];
		this.nomeCliente = props.nomeCliente || "";
		this.nrSeqEndereco = props.nrSeqEndereco || 0;
		this.numero = props.numero || 0;
		this.pagamentosPedido = props.pagamentosPedido || [];
		this.podeExcluir = !!props.podeExcluir;
		this.quantidadeItens = props.quantidadeItens || 0;
		this.statusPedido = props.statusPedido || "";
		this.valorCalculadoPedido = props.valorCalculadoPedido || 0;
		this.valorPago = props.valorPago || 0;
	}
}

export class ItensPedido {
	public cartao: Maybe<string>;
	public documento: string;
	public idCliente: number;
    public idItemPedido: IdItemPedido;
    public idItemBeneficio: IdItemBeneficio;
    public numeroItem: Maybe<number>;
	public servico: string;
	public usuario: string;
    public valor: number;
    public valorRefeicao: number;
    public valorUsoDiario: Maybe<number>;
    public valorUsoDiarioRefeicao: Maybe<number>;
	public valorAlimentacao: Maybe<number>;
	public valorCombustivel: Maybe<number>;

	public constructor(props: Partial<ItensPedido> = {}) {
		this.cartao = props.cartao || "";
		this.documento = props.documento || "";
		this.idCliente = props.idCliente || 0;
        this.idItemPedido = props.idItemPedido || 0;
        this.idItemBeneficio = props.idItemBeneficio || 0;
		this.numeroItem = props.numeroItem || 0;
		this.servico = props.servico || "";
		this.usuario = props.usuario || "";
        this.valor = props.valor || 0;
        this.valorRefeicao = props.valorRefeicao || 0;
        this.valorUsoDiario = props.valorUsoDiario || 0;
        this.valorUsoDiarioRefeicao = props.valorUsoDiarioRefeicao || 0;
		this.valorAlimentacao = props.valorAlimentacao || 0;
		this.valorCombustivel = props.valorCombustivel || 0;
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

	public constructor(props: Partial<PagamentosPedido> = {}) {
		this.valorPago = props.valorPago || 0;
		this.dataPagamento = props.dataPagamento || "";
		this.formaPagamento = props.formaPagamento || "";
		this.identificador = props.identificador || "";
		this.dataBaixa = props.dataBaixa || "";
		this.tipoBaixa = props.tipoBaixa || "";
		this.usuario = props.usuario || "";
	}
}

export const CreateOrderItemFromQueryOrderItem = (item: ItensPedido, order: Pedido, remove = false) =>
	new ItemPedido({
		...item,
		idItem: item.numeroItem,
		idPedido: order.numero,
		valorCredito: item.valor,
		numeroLogicoMidia: item.cartao ?? "",
		excluir: remove,
		idTipoItemPedido: item.idItemPedido,
        idItemBeneficio: item.idItemBeneficio
	});

import { ItemPedido } from "./item-pedido";
import { TipoPagamento } from "./tipo-pagamento";
import { Maybe } from "../../../typings";

export class Pedido {
	public readonly numero: Maybe<number>;
	public readonly idCliente: number;
	public readonly idTipoPerfilCliente: "USUARIO";
	public readonly valorPedido: number;
	public readonly valorCalculadoPedido: number;
	public readonly itensPedido: ItemPedido[];
	public readonly tipoPagamento: TipoPagamento[];
	public readonly nrSeqEndereco: number;
	public readonly comTaxaEntrega: boolean;

	public constructor(props: Partial<Pedido> = {}) {
		this.idCliente = props.idCliente || 0;
		this.valorPedido = props.valorPedido || 0;
		this.itensPedido = props.itensPedido || [];
		this.nrSeqEndereco = props.nrSeqEndereco || 0;
		this.comTaxaEntrega = props.comTaxaEntrega || false;
		this.valorCalculadoPedido = props.valorCalculadoPedido || 0;
		this.idTipoPerfilCliente = props.idTipoPerfilCliente || "USUARIO";
		this.tipoPagamento = props.tipoPagamento || [TipoPagamento.BOLETO];
	}
}

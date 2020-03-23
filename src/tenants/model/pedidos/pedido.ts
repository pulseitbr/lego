import { ItemPedido } from "./item-pedido";
import { TipoPagamento } from "./tipo-pagamento";
import { Maybe } from "../../../typings";

export class Pedido {
	public readonly comTaxaEntrega: boolean;
	public readonly idCliente: number;
	public readonly idTipoPerfilCliente: "USUARIO" | "EMPRESA";
	public readonly itensPedido: ItemPedido[];
	public readonly nrSeqEndereco: number;
	public readonly numero: Maybe<number>;
	public readonly tipoPagamento: TipoPagamento[];
	public readonly valorCalculadoPedido: number;
	public readonly valorPedido: number;

	public constructor(props: Partial<Pedido> = {}) {
		this.comTaxaEntrega = props.comTaxaEntrega ?? false;
		this.idCliente = props.idCliente || 0;
		this.idTipoPerfilCliente = props.idTipoPerfilCliente || "USUARIO";
		this.itensPedido = props.itensPedido || [];
		this.nrSeqEndereco = props.nrSeqEndereco || 0;
		this.numero = props.numero || null;
		this.tipoPagamento = props.tipoPagamento || [TipoPagamento.BOLETO];
		this.valorCalculadoPedido = props.valorCalculadoPedido || 0;
		this.valorPedido = props.valorPedido || 0;
	}
}

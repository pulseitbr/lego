import { IsMobifacil, TENANT, Tenants } from "../..";
import { ToInt } from "../../../format/number";
import { Favorecido } from "../user/favorecido";
import { Maybe } from "../../../typings";

export const GetApplicationIdByTenant = () => (IsMobifacil ? 1 : 100);

export enum IdItemPedido {
	CREDITO_APLICACAO = 1,
	CREDITO_MIDIA = 2,
	PRODUTO = 3,
	SERVICO = 4,
	PRODUTO_E_CREDITO = 5,
	SEGUNDA_VIA = 6,
	TAXA_ENTREGA = 7
}

export const getItemTypeOrder = (person: Favorecido): Maybe<IdItemPedido> => {
	if (person.cartao !== null) {
		return IdItemPedido.CREDITO_MIDIA;
	}
	if (person.cartao === null && person.solicitarSegundaVia) {
		return IdItemPedido.SEGUNDA_VIA;
	}
	if (person.cartao === null && person.solicitarPrimeiraVia) {
		return IdItemPedido.PRODUTO_E_CREDITO;
	}
	return null;
};

export const IdAplicacaoPrompt = () => {
	if (TENANT === Tenants.dev) {
		return ToInt(prompt("Selecione o idAplicacao --- 1 para Mobifacil --- 100 para andario") || 1);
	}
	return GetApplicationIdByTenant();
};

export const IdEmissorPrompt = (tenant: string) => {
	if (tenant === Tenants.dev) {
		return ToInt(prompt("Selecione o idEmissor --- 2 para Mobifacil --- 1 para andario") || 1);
	}
	if (tenant === Tenants.mobifacil) {
		return 2;
	}
	return 1;
};

export const motivoCancelamentoPerda = 1;

export class ItemPedido {
	public idItem?: number | null;
	public idPedido?: number | null;
	public idAplicacao: number;
	public idModeloProduto: number;
	public idTipoItemPedido: IdItemPedido;
	public valorCredito: number;
	public idTipoPerfilCliente: "USUARIO" | "COLABORADOR";
	public idCliente: number;
	public idMotivoCancelamento?: number;
	public valorProduto: number;
	public numeroLogicoMidia: string;
	public idEmissorMidia: number;

	public constructor(props: Partial<ItemPedido> = {}) {
		this.idEmissorMidia = props.idEmissorMidia || IdEmissorPrompt(TENANT);
		this.valorProduto = props.valorProduto || 0;
		this.idItem = props.idItem || null;
		this.idPedido = props.idPedido || null;
		this.idAplicacao = props.idAplicacao || IdAplicacaoPrompt();
		this.idModeloProduto = props.idModeloProduto || 1;
		this.idMotivoCancelamento = props.idMotivoCancelamento || 0;
		this.idTipoItemPedido = props.idTipoItemPedido || 0;
		this.valorCredito = props.valorCredito || 0;
		this.idTipoPerfilCliente = props.idTipoPerfilCliente || "USUARIO";
		this.idCliente = props.idCliente || 0;
		this.numeroLogicoMidia = props.numeroLogicoMidia || "";
	}
}

export const defineItemRequestTypeByValue = (value: number) => (value === 0 ? IdItemPedido.PRODUTO : IdItemPedido.PRODUTO_E_CREDITO);

import { Cartao } from "../card/cartao";
import { IsEmpty } from "../../../validations";

export const filterToOrder = (x: Favorecido) => {
	if (!IsEmpty(x.cartao)) {
		return true;
	}
	return x.solicitarPrimeiraVia || x.solicitarSegundaVia;
};

export default class Favorecido {
	public cartao?: Cartao | null;
	public idClientePrincipal: number;
	public idClienteFavorecido: number;
	public dataInclusao: string;
	public dataCancelamento: string | null;
	public nome: string;
	public email: string;
	public telefone: string;
	public numeroDocumento: string;
	public solicitarSegundaVia: boolean;
	public solicitarPrimeiraVia: boolean;
	public valorUsoDiario: number;
	public matricula: string;

	public constructor(props: Partial<Favorecido> = {}) {
		this.cartao = props.cartao || null;
		this.matricula = props.matricula || "";
		this.idClientePrincipal = props.idClientePrincipal || 0;
		this.idClienteFavorecido = props.idClienteFavorecido || 0;
		this.dataInclusao = props.dataInclusao || "";
		this.dataCancelamento = props.dataCancelamento || null;
		this.nome = props.nome || "";
		this.email = props.email || "";
		this.telefone = props.telefone || "";
		this.numeroDocumento = props.numeroDocumento || "";
		this.solicitarSegundaVia = props.solicitarSegundaVia || false;
		this.solicitarPrimeiraVia = props.solicitarPrimeiraVia || false;
		this.valorUsoDiario = props.valorUsoDiario || 0;
	}
}

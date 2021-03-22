import { IsEmpty } from "../../../validations";
import { Cartao } from "../card/cartao";

export const filterToOrder = (x: Favorecido) => {
	if (!IsEmpty(x.cartao)) {
		return true;
	}
	return x.solicitarPrimeiraVia || x.solicitarSegundaVia;
};

export class Favorecido {
	public cartao?: Cartao | null;
	public dataCancelamento: string | null;
	public dataInclusao: string;
	public email: string;
	public idClienteFavorecido: number;
	public idClientePrincipal: number;
	public matricula: string;
	public nome: string;
	public numeroDocumento: string;
	public solicitarPrimeiraVia: boolean;
	public solicitarSegundaVia: boolean;
	public telefone: string;
    public valorUsoDiario: number;
    public valorUsoDiarioRefeicao: number;
    public valorAlimentacao: number;
    public valorCombustivel: number;
    public mix: boolean;

	public constructor(props: Partial<Favorecido> = {}) {
		this.cartao = props.cartao || null;
		this.dataCancelamento = props.dataCancelamento || null;
		this.dataInclusao = props.dataInclusao || "";
		this.email = props.email || "";
		this.idClienteFavorecido = props.idClienteFavorecido || 0;
		this.idClientePrincipal = props.idClientePrincipal || 0;
		this.matricula = props.matricula || "";
		this.nome = props.nome || "";
		this.numeroDocumento = props.numeroDocumento || "";
		this.solicitarPrimeiraVia = props.solicitarPrimeiraVia ?? false;
		this.solicitarSegundaVia = props.solicitarSegundaVia ?? false;
		this.telefone = props.telefone || "";
        this.valorUsoDiario = props.valorUsoDiario || 0;
        this.valorUsoDiarioRefeicao = props.valorUsoDiarioRefeicao || 0;
        this.valorAlimentacao = props.valorAlimentacao || 0;
        this.valorCombustivel = props.valorCombustivel || 0;
        this.mix = props.mix ?? false;
	}
}

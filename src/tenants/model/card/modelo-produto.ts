import { Cartao } from "./cartao";
import { $__BP__ } from "../../../config";
import { ToInt } from "../../../format/number";
const { gratuityCard, svgCard } = $__BP__.config;
enum ModeloProduto {
	Transporte = 1,
	VT = 2,
	Operador = 3,
	QRCode = 4,
	GratuidadeEstudante = 5
}

export const CardImageById = {
	1: svgCard as string,
	2: svgCard as string,
	3: svgCard as string,
	4: svgCard as string,
	5: gratuityCard as string
};

export default ModeloProduto;

const authorizedIds = [ModeloProduto.Transporte, ModeloProduto.VT];
export const authorizedToOrder = (card: Cartao) => authorizedIds.includes(ToInt(card.modeloProduto)) && !card.cancelado;

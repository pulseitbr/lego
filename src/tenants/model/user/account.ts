export class Conta {
	public readonly id: string;
	public readonly clientId: string;
	public readonly balance: number;
	public readonly type: "CreditoValeTransporte" | "CreditoDeTransporte" | "CreditoMidia" | "CreditoEletronicoAndario";

	public constructor(props: Partial<Conta> = {}) {
		this.id = props.id || "";
		this.clientId = props.clientId || "";
		this.balance = props.balance || 0;
		this.type = props.type || "CreditoEletronicoAndario";
	}
}

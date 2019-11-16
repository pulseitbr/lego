export enum Profile {
	Administrador = "ADMINISTRADOR",
	Financeiro = "FINANCEIRO",
	Operadora = "OPERADORA",
	Loja = "LOJA",
	Empresa = "EMPRESA",
	Usuario = "USUARIO",
	Motorista = "MOTORISTA",
	Permissionario = "PERMISSIONARIO"
}

export const ProfileAlias = {
	[Profile.Administrador]: "admin",
	[Profile.Loja]: "store",
	[Profile.Financeiro]: "financial",
	[Profile.Empresa]: "company",
	[Profile.Motorista]: "driver",
	[Profile.Operadora]: "carrier",
	[Profile.Permissionario]: "permissionee",
	[Profile.Usuario]: "user"
};

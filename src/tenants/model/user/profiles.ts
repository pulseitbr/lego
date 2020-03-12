export enum Profile {
	Administrador = "ADMINISTRADOR",
	Empresa = "EMPRESA",
	Financeiro = "FINANCEIRO",
	Loja = "LOJA",
	Motorista = "MOTORISTA",
	Operadora = "OPERADORA",
	Permissionario = "PERMISSIONARIO",
	Usuario = "USUARIO",
	Atendente = "ATENDENTE_LOJA",
	Supervisor = "SUPERVISOR_LOJA"
}

export const ProfileAlias = {
	[Profile.Administrador]: "admin",
	[Profile.Empresa]: "company",
	[Profile.Financeiro]: "financial",
	[Profile.Loja]: "store",
	[Profile.Motorista]: "driver",
	[Profile.Operadora]: "carrier",
	[Profile.Permissionario]: "permissionee",
    [Profile.Usuario]: "user",
    [Profile.Atendente]: "clerk",
    [Profile.Supervisor]: "supervisor",
};

export const ProfileToAssociateCard = [Profile.Operadora, Profile.Loja, Profile.Permissionario];

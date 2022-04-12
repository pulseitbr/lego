import { $__BP__ } from "../config";

export const TENANT = $__BP__.tenant.toLowerCase();
export const TENANT_TITLE = $__BP__.config.tenant;
export const GLOBAL_CONFIG = $__BP__.config;
export const VERSION = $__BP__.version;

export enum Tenants {
	dev = "dev",
    jae = "jae",
    homolog = "homolog",
    cross = "cross",
    riobranco = "riobranco"
}

export const MidiaAppId = {
	dev: 1,
    jae: 1,
    homolog: 1,
    cross: 1,
    riobranco: 1
};

export const ModalByTenant = { name: TENANT, code: MidiaAppId[TENANT] };

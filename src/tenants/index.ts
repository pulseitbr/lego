import { $__BP__ } from "../config";

export const TENANT = $__BP__.tenant.toLowerCase();
export const TENANT_TITLE = $__BP__.config.tenant;
export const GLOBAL_CONFIG = $__BP__.config;
export const VERSION = $__BP__.version;

export enum Tenants {
	dev = "dev",
    homolog = "homolog",
    cross = "cross",
    jae = "jae"
}

export const MidiaAppId = {
	dev: 1,
    jae: 1,
    homolog: 1,
    cross: 1
};

export const ModalByTenant = { name: TENANT, code: 1 };

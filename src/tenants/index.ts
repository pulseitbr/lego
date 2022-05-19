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


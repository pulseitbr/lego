import ThemeConfig from "./default";
import { IsEmpty } from "../validations";

export type TypeColors = {
	primary: string;
	primaryAlpha: string;
	primaryLight: string;
	primaryLightest: string;
	primaryDark: string;
	primaryDarkest: string;
	secondary: string;
	secondaryAlpha: string;
	secondaryLight: string;
	secondaryLightest: string;
	secondaryDark: string;
	secondaryDarkest: string;
	info: string;
	infoAlpha: string;
	infoLight: string;
	infoLightest: string;
	infoDark: string;
	infoDarkest: string;
	warn: string;
	warnAlpha: string;
	warnLight: string;
	warnLightest: string;
	warnDark: string;
	warnDarkest: string;
	danger: string;
	dangerAlpha: string;
	dangerLight: string;
	dangerLightest: string;
	dangerDark: string;
	dangerDarkest: string;
	success: string;
	successAlpha: string;
	successLight: string;
	successLightest: string;
	successDark: string;
	successDarkest: string;
	dark: string;
	darkAlpha: string;
	darkLight: string;
	darkLightest: string;
	darkDark: string;
	darkDarkest: string;
	light: string;
	lightAlpha: string;
	lightLight: string;
	lightLightest: string;
	lightDark: string;
	lightDarkest: string;
	disabled: string;
	disabledAlpha: string;
	disabledLight: string;
	disabledLightest: string;
	disabledDark: string;
	disabledDarkest: string;
};

declare const BP_CONFIG: {
	tenant: string;
	version: string;
	config: {
		background_color: string;
		baseUrl: string;
		card: string;
		cardBack: string;
		favicon: string;
		gratuityCard: string;
		icon: string;
		loginUrl: string;
		logo: string;
		logo2: string;
		svgCard: string;
		tenant: string;
		theme_color: string;
		theme: TypeColors;
	};
};

declare global {
	interface Window {
		$__BP__: typeof BP_CONFIG;
	}
}

if (IsEmpty(window.$__BP__)) {
	window.$__BP__ = {
		tenant: "",
		version: "",
		config: {
			background_color: "",
			baseUrl: "",
			card: "",
			cardBack: "",
			favicon: "",
			gratuityCard: "",
			icon: "",
			logo: "",
			logo2: "",
			svgCard: "",
			tenant: "",
			theme_color: "",
			loginUrl: "",
			theme: ThemeConfig as TypeColors
		}
	};
}

const BP_TENANT_CONFIG = window.$__BP__;

export const $__BP__: typeof BP_CONFIG = {
	...BP_TENANT_CONFIG,
	config: {
		...BP_TENANT_CONFIG.config,
		theme: BP_TENANT_CONFIG.config.theme
	}
};

const Colors = $__BP__.config.theme;

export const BASE_URL = $__BP__.config.baseUrl;

export const LOGIN_URL = $__BP__.config.loginUrl;

export default Colors;

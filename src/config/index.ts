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

declare const CONFIG_THEME: {
	tenant: string;
	version: string;
	config: {
		theme: TypeColors;
		icon: string;
		logo: string;
		card: string;
		logo2: string;
		tenant: string;
		favicon: string;
		cardBack: string;
		theme_color: string;
		background_color: string;
	};
};

declare global {
	interface Window {
		$__BP__: typeof CONFIG_THEME;
	}
}

const emptyGlobalBP = IsEmpty(window.$__BP__);

if (emptyGlobalBP) {
	window.$__BP__ = {
		tenant: "",
		version: "",
		config: {
			icon: "",
			logo: "",
			card: "",
			logo2: "",
			tenant: "",
			favicon: "",
			cardBack: "",
			theme_color: "",
			background_color: "",
			theme: ThemeConfig as TypeColors
		}
	};
}

const BP_PLACEHOLDER = window.$__BP__;
export const $__BP__: typeof CONFIG_THEME = {
	...BP_PLACEHOLDER,
	config: {
		...BP_PLACEHOLDER.config,
		theme: BP_PLACEHOLDER.config.theme
	}
};

const Colors = $__BP__.config.theme;

export default Colors;

import { isProd } from "../env";
import IsObject from "../validations/IsObject";

const Console = (...args: any[]) => {
	if (isProd) {
		return;
	}
	const timeLog = new Date();
	console.group(timeLog);
	let hasArray = false;
	let output = "";
	let consoleType = console.log;
	if (args.length === 1) {
		const o = args[0];
		if (IsObject(o)) {
			Object.values(o).forEach((x) => {
				if (Array.isArray(x)) {
					hasArray = true;
				}
			});
			if (!hasArray) {
				output = JSON.stringify(o, null, 4);
			}
		}
		if (Array.isArray(o)) {
			output = JSON.stringify(o, null, 4);
		}
		consoleType(output);
		console.log("Original LOG", o);
	} else {
	}
	console.groupEnd();
};

export default Console;

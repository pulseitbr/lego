const { BbCode } = require("../dist");

test("BbCode test", () => {
	const html = "[zap phone='5521984047599' text='Me ajuda']Chama no zap[/zap]";
	const code = BbCode(html);
	expect(code).not.toBeNull();
});

const expect = require("expect");
const { isRealString } = require("./validation.js");

describe("isRealString", () => {

    it("should reject nonstring values", () => {
        expect(isRealString(2)).toBe(false);
    });

    it("sbould reject string that are only spaces", () => {
        expect(isRealString("   ")).toBe(false);
    });

    it("should allow strings with that are not only spaces", () => {
        expect(isRealString("  hi!")).toBe(true);
    });

});



"use strict";

describe("checkLinks.helper", () => {
    beforeEach(() => {
        require("../lib/checkLinks.helper");
    });
    it("expects jasmine.checkLinks to exist", () => {
        expect(jasmine.checkLinks).toBeDefined();
    });
});

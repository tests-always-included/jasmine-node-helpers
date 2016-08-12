"use strict";

describe("failfasdfasd", () => {
    beforeEach(() => {
        require("../lib/fail.helper");
    });
    it("expects jasmine.fail to exist", () => {
        expect(jasmine.fail).toBeDefined();
    });
});

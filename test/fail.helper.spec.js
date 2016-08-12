"use strict";

describe("fail.helper", () => {
    beforeEach(() => {
        require("../lib/fail.helper");
    });
    it("expects jasmine.fail to exist", () => {
        expect(jasmine.fail).toBeDefined();
    });
});

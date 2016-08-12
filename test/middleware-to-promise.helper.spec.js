"use strict";

describe("middleware-to-promise.helper", () => {
    beforeEach(() => {
        require("../lib/middleware-to-promise.helper");
    });
    it("expects jasmine.middlewareToPromise to exist", () => {
        expect(jasmine.middlewareToPromise).toBeDefined();
    });
});

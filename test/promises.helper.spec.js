"use strict";

describe("promises.helper", () => {
    beforeEach(() => {
        require("../lib/promises.helper");
    });
    it("expects jasmine promises to be patched to exist", () => {
        expect(jasmine.Env.prototype.patchedForPromises).toBe(true);
    });
});

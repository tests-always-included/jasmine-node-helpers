"use strict";

xdescribe("fail.helper", () => {
    it("expects jasmine.fail to exist", () => {
        expect(jasmine.fail).not.toBeDefined();
    });
    it("expects jasmine.fail to exist", () => {
        require("../lib/fail.helper");
        expect(jasmine.fail).toEqual(jasmine.any(Function));
    });
    describe("fsdfadaf", () => {
        beforeEach(() => {
            require("../lib/fail.helper");
        });
        it("should do something", () => {
            jasmine.fail(false, false);
        });
        it("should do something2", () => {
            jasmine.fail(null, false);
        });
        it("should do something3", () => {
            jasmine.fail(undefined, false);
        });
        it("should do something4", () => {
            jasmine.fail(false, undefined);
        });
    });
});

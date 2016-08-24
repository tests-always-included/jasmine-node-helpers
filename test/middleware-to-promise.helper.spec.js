"use strict";

describe("middleware-to-promise.helper", () => {
    var factory, middlewareTest, mockCall;

    require("../lib/promises.helper");
    require("../lib/fail.helper");
    beforeEach(() => {
        var second;

        require("../lib/middleware-to-promise.helper");

        mockCall = jasmine.createSpyObj("mock", [
            "call",
            "otherCall"
        ]);
        mockCall.call.andCallFake(() => {
            return new Promise((resolve) => {
                return resolve();
            });
        });
        mockCall.otherCall.andCallFake(() => {
            return new Promise((resolve, reject) => {
                return reject();
            });
        });
        factory = (secondResult) => {
            second = createSpyObj("afsdf", [
                "call"
            ]);
            second.call.andCallFake(() => {
                return new Promise((resolve, reject) => {
                    if (secondResult === "pass") {
                        return resolve();
                    } else {
                        return reject();
                    }
                });
            });

            return require("./mock/middleware-mock")(mockCall, second);
        }
    });
    it("expects jasmine.middlewareToPromise to exist", () => {
        expect(jasmine.middlewareToPromise).toBeDefined();
    });
    describe("sets up mock middleware", () => {
        var res, req, server;

        beforeEach(() => {
            server = require("./mock/server-mock")();
        });
        it("should pass and run call", () => {
            var middlewareAsync;

            middlewareAsync = jasmine.middlewareToPromise(factory("pass")(server));
            return middlewareAsync().then(() => {
                expect(mockCall.call).toHaveBeenCalled();
            });
        });
        it("should fail and run otherCall", () => {
            var middlewareAsync;

            middlewareAsync = jasmine.middlewareToPromise(factory("fail")(server));
            return middlewareAsync().then(jasmine.fail, () => {
                expect(mockCall.otherCall).toHaveBeenCalled();
            });
        });
        it("should fail completely and not run any calls", () => {
            var middlewareAsync;

            middlewareAsync = jasmine.middlewareToPromise("failToMakePromise");
            return middlewareAsync().then(jasmine.fail, () => {
                expect(mockCall.otherCall).not.toHaveBeenCalled();
                expect(mockCall.call).not.toHaveBeenCalled();
            });
        });
    });
});

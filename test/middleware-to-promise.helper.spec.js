"use strict";

describe("middleware-to-promise.helper", () => {
    beforeEach(() => {
        require("../lib/middleware-to-promise.helper");
    });
    it("expects jasmine.middlewareToPromise to exist", () => {
        expect(jasmine.middlewareToPromise).toBeDefined();
    });
    it("does something", () => {
        var mock, middlewareAsync;

        mock = {
            get: jasmine.createSpy("server.get"),
            use: jasmine.createSpy("server.use")
        };
        mock.router = {
            render: jasmine.createSpy("server.router.render").andCallFake((name, obj) => {
                var route;

                route = `rendered route: ${name}`;

                if (obj) {
                    Object.keys(obj).forEach((key) => {
                        route += `, ${key}:${JSON.stringify(obj[key])}`;
                    });
                }

                return route;
            })
        };

        middlewareAsync = jasmine.middlewareToPromise(mock);
        middlewareAsync().then((result) => {

        });
    });
});

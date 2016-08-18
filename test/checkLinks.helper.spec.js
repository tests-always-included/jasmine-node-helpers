"use strict";

describe("checkLinks.helper", () => {
    beforeEach(() => {
        require("../lib/checkLinks.helper");
    });
    it("expects jasmine.checkLinks to exist", () => {
        expect(jasmine.checkLinks).toBeDefined();
    });
    it("should be something", () => {
        jasmine.checkLinks([
            {
                href: "rendered route: self-discovery",
                rel: "up",
                title: "self-discovery"
            },
            {
                href: "http://example.com:8000/path",
                rel: "self"
            }
        ], [
            {
                href: "rendered route: self-discovery",
                rel: "up",
                title: "self-discovery"
            },
            {
                href: "http://example.com:8000/path",
                rel: "self"
            }
        ]);
    });
});

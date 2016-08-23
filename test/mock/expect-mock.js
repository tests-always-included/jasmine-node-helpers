"use strict";

module.exports = (thing) => {

    function expect (thing) {
        var mock;

        mock = {};
        mock.toBe = jasmine.createSpy("mock.toBe").andCallFake(() => {
            return true;
        });

        return mock;
    };

    return expect(thing);
};

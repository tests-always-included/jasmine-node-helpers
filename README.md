Jasmine Test Helpers
====================

*Helping you test your [Node.js] applications, one helper at a time.*

[![npm version][npm-badge]][npm-link]
[![Build Status][travis-badge]][travis-link]
[![Dependencies][dependencies-badge]][dependencies-link]
[![Dev Dependencies][devdependencies-badge]][devdependencies-link]
[![codecov.io][codecov-badge]][codecov-link]


About
-----

This contains a series of [Jasmine] helpers made to facilitate testing certain functionality more easily. These help to detect when a test fails but should have passed, turn middleware into a promise and makes it easier to use promises in tests. More explanation is below for each helper.


How to Use With Jasmine Versions 2 And Up
-----------------------------------------

Include the package in your `package.json` file.

    npm install --save-dev jasmine-test-helpers

Then you need to be able to include the helper in your testing directory or where you'd like to run tests.

You can do this by creating a helpers object in your `spec/support/jasmine.json` file, or adding to an existing helpers object.

If you don't already have a helpers object in `spec/support/jasmine.json`, add this:


    "helpers": [
        "../node_modules/jasmine-test-helpers/lib/**/*.js"
    ]

If you already have a helpers object, just add `"../node_modules/jasmine-test-helpers/lib/"` to it.


How to Use With Jasmine Versions Below 2
----------------------------------------

Include the package in your `package.json` file.

    npm install --save-dev jasmine-test-helpers

Then you need to be able to include the helper in your testing directory or
where you'd like to run tests.

You can do this by adding a path to the module in the run scripts in your
`package.json`. For example, if your `package.json` looks something like this:


    {
        "scripts": {
            "start": "node bin/myCoolApp",
            "test": "jasmine-node spec/"
        }
    }

You would change that to:


    {
        "scripts": {
            "start": "node bin/myCoolApp",
            "test": "jasmine-node node_modules/jasmine-test-helpers/lib/ spec/"
        }
    }


`jasmine.fail([actual], [expected])`
------------------------------------

This is most useful when testing a promise is getting the reject as expected, and when you'd like the test to fail if the promise is resolved rather than rejected. Parameters can be passed as well if they make sense for the test, but don't regularly need to be used as this will cause a failure of the test if called.

    describe("a suite", () => {
        it("rejects the returned promise", () => {
            return someClass.someMethodAsync().then(jasmine.fail, () => {
                expect(someVar).toBe("this");
            });
        });
    });


`jasmine.middlewareToPromise(middlewareFunction)`
-------------------------------------------------

Used when wanting to make a piece of middleware used in setting up a node server and you want to make it to be run synchronously with your tests to get a response back straight away without waiting for a real promise to resolve.

The middleware can be written in a traditional style using a callback like `done` or `next`.

    var middleware, middlewareAsync, req, res;

    middleware = require("../lib/your-favorite-middleware");
    middlewareAsync = jasmine.middlewareToPromise(middleware);

    beforeEach(() => {
        req = makeFakeRequestObject();  // You write this
        res = makeFakeResponseObject();  // You write this
    });
    describe("a suite", () => {
        it("is easier with promises", () => {
            // If an argument is passed, the promise is rejected.
            // If the middleware throws, the promise is rejected.
            // The promise helper automatically handles both.
            // Just remember to `return` the promise.
            return middlewareAsync(req, res).then(() => {
                expect(res.send).toHaveBeenCalled();
            });
        });
        it("works in a traditional way", (done) => {
            // You must manually ensure the middleware does not throw.
            // Also you must manually ensure no argument was passed to
            // the `done` / `next` callback.
            // Don't forget to call `done()` when everything's complete.
            function doneWithMiddleware(arg) {
                expect(arg).not.toBeDefined();
                expect(res.send).toHaveBeenCalled();
                done();
            }
            jasmine.expect(() => {
                middleware(req, res, doneWithMiddleware);
            }).not.toThrow();
        });
    });


Promises Helper
---------------

This makes it much easier to use promises in node tests. Instead of having to remember to pass `done` in the `it` part of the testing in [Jasmine], you simple need to return the promise and the rest is handled like normal.

    // Before
    describe("a suite", () => {
        it("does what the test needs to do", (done) => {
            someClass.someMethodAsync().then((result) => {
                expect(result).toBe("this");
            }).then(done, done);
        });
    });

    // After
    describe("a suite", () => {
        it("does what the test needs to do", () => {
            return someClass.someMethodAsync().then((result) => {
                expect(result).toBe("this");
            });
        });
    });

See how much simpler that is? You won't need to add `done` to the `it` or accidentally put `done` in the `describe` and wonder why your tests are failing when you've been writing tests all day.


[codecov-badge]: https://img.shields.io/codecov/c/github/tests-always-included/jasmine-test-helpers/master.svg
[codecov-link]: https://codecov.io/github/tests-always-included/jasmine-test-helpers?branch=master
[dependencies-badge]: https://img.shields.io/david/tests-always-included/jasmine-test-helpers.svg
[dependencies-link]: https://david-dm.org/tests-always-included/jasmine-test-helpers
[devdependencies-badge]: https://img.shields.io/david/dev/tests-always-included/jasmine-test-helpers.svg
[devdependencies-link]: https://david-dm.org/tests-always-included/jasmine-test-helpers#info=devDependencies
[Jasmine]: https://www.npmjs.com/package/jasmine
[Jasmine-Node]: https://www.npmjs.com/package/jasmine-node
[Node.js]: https://nodejs.org
[npm-badge]: https://img.shields.io/npm/v/jasmine-test-helpers.svg
[npm-link]: https://npmjs.org/package/jasmine-test-helpers
[travis-badge]: https://img.shields.io/travis/tests-always-included/jasmine-test-helpers/master.svg
[travis-link]: http://travis-ci.org/tests-always-included/jasmine-test-helpers

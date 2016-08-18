Node Test Helpers
==================
*Helping you test your [Node.js] applications one helper at a time.*

[![Build Status][travis-image]][Travis CI]
[![Dependencies][dependencies-image]][Dependencies]
[![Dev Dependencies][devdependencies-image]][Dev Dependencies]
[![codecov.io][codecov-image]][Code Coverage]

About
-----
This contains a series of [Jasmine] helpers to facilitate testing certain functionality easily.

jasmine.checkLinks
------------------
This is used when you want the check the links created for headers of and HTTP response. This only used if your Node application is setting up as a web server.

```js
describe("a suite", () => {
    it("a test", () => {
        var links;

        links = [
            {
                href: "rendered route: self-discovery",
                rel: "up",
                title: "self-discovery"
            },
            {
                href: "http://example.com:8000/path",
                rel: "self"
            }
        ];
        jasmine.checkLinks(someClass.createHeader().links, links);
    });
});
```

jasmine.fail
------------
This is most useful when testing a promise which you are wanting to check the test is getting to the reject successfully, but want to fail in case code changes which makes the code succeed instead of fail.

```js
describe("a suite", () => {
    it("a test", () => {
        return someClass.someMethodAsync().then(() => {
            // Causes test to fail automatically if code runs here.
            jasmine.fail();
        }, () => {
            expect(someVar).toBe("this");
        });
    });
});
```

jasmine.middlewareToPromise
---------------------------
Used when wanting to make a piece of middleware used in setting up a node server and you want to make it to be ....

```js
describe("a suite", () => {
    it("a test", () => {
        var middlewareAsync;

        middlewareAsync = jasmine.middlewareToPromise(mock);
        middlewareAsync().then((result) => {
        });
    });
});
```

Promises helper
---------------

This makes it much easier to use promises in node tests. Instead of having to remember to pass `done` in the `it` part of the testing in [Jasmine], you simple need to return the promise and the rest is handled like normal.

```js
// Before
describe("a suite", () => {
    it("a test", (done) => {
        someClass.someMethodAsync().then((result) => {
            expect(result).toBe("this");
        }).then(done, done);
    });
});

// After
describe("a suite", () => {
    it("a test", () => {
        return someClass.someMethodAsync().then((result) => {
            expect(result).toBe("this");
        });
    });
});
```
See how much simpler that is? You won't need to add done to the `it` or accidentally put `done` in the describe and wonder why your tests are failing when you've been writing tests all day.


[Code Coverage]: https://codecov.io/github/AbsentSemicolon/node-test-helpers?branch=develop
[codecov-image]: https://codecov.io/github/AbsentSemicolon/node-test-helpers/coverage.svg?branch=develop
[Dev Dependencies]: https://david-dm.org/AbsentSemicolon/node-test-helpers/develop#info=devDependencies
[devdependencies-image]: https://david-dm.org/AbsentSemicolon/node-test-helpers/develop/dev-status.png
[Dependencies]: https://david-dm.org/absentsemicolon/node-test-helpers/develop
[dependencies-image]: https://david-dm.org/absentsemicolon/node-test-helpers/develop.png
[Jasmine]: https://jasmine.github.io/
[Node.js]: https://nodejs.org
[travis-image]: https://secure.travis-ci.org/AbsentSemicolon/node-test-helpers.png
[Travis CI]: http://travis-ci.org/AbsentSemicolon/node-test-helpers

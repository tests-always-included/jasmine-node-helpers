Jasmine-Node Helpers
====================
*Helping you test your [Node.js] applications, one helper at a time.*

[![Build Status][travis-image]][Travis CI]
[![Dependencies][dependencies-image]][Dependencies]
[![Dev Dependencies][devdependencies-image]][Dev Dependencies]
[![codecov.io][codecov-image]][Code Coverage]

About
-----
This contains a series of [Jasmine]1.3 helpers when using [Jasmine-Node] to facilitate testing certain functionality more easily. These help to detect when a test fails but should have passed, turn middleware into a promise and makes it easier to use promises in tests. More explanation is below for each helper.

*Note: If you are not using [Jasmine-Node] these helpers aren't going to help your testing suite very much.*

How to Use
----------
Include the package in your `package.json` file.

```
npm install --save-dev node-test-helpers
```

Then you need to be able to include the helper in your testing directory or where you'd like to run tests.

You can do this by creating a symbolic link to files contained. You'll want to link to the files and not the folder. [Jasmine] doesn't seem to pick up on the files if only the folder is linked. Below is an example of setting up a symbolic link. Make sure to include the folder in your `.gitignore` file so you don't commit the files as this folder will show up in your status.

```
// Linux/MacOS
mkdir ./path/to/project/test-folder/jasmine-node-helpers

ln -s /path/to/project/from/root/node_modules/jasmine-node-helpers/lib/* ./path/to/project/test-folder/jasmine-node-helpers/

// Windows
// If you can figure out how to make symlink work, good on you, make a [fork](CONTRIBUTING.md) and update those instructions please.
```

jasmine.fail
------------
This is most useful when testing a promise which you are wanting to check the test is getting to the reject successfully, but want to fail in case code changes which makes the promise resolve instead of reject. This will make the test fail so it can be caught and code can be diagnosed.

```js
describe("a suite", () => {
    it("a test", () => {
        return someClass.someMethodAsync().then(jasmine.fail, () => {
            expect(someVar).toBe("this");
        });
    });
});
```

jasmine.middlewareToPromise
---------------------------
Used when wanting to make a piece of middleware used in setting up a node server and you want to make it to be run synchronously with your tests to get a response back straight aways without waiting for a real promise to resolve.

This a bit of a complicated process and your middleware will need to be written in the style as the example and test is in, but should make it easy to test your middleware.

```js
describe("a file", () => {
    var mock, mockDependency;

    beforeEach(() => {
        mockDependency = require("./mock/mockDependency");
        mock = require("mock")(mockDependency);
    });
    describe("a suite", () => {
        it("a test", () => {
            var middlewareAsync;

            middlewareAsync = jasmine.middlewareToPromise(mock(passedInArgument));
            middlewareAsync().then(() => {
                expect(mockDependency.call).toHaveBeenCalled();
            });
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
See how much simpler that is? You won't need to add `done` to the `it` or accidentally put `done` in the `describe` and wonder why your tests are failing when you've been writing tests all day.


[Code Coverage]: https://codecov.io/github/AbsentSemicolon/node-test-helpers?branch=develop
[codecov-image]: https://codecov.io/github/AbsentSemicolon/node-test-helpers/coverage.svg?branch=develop
[Dev Dependencies]: https://david-dm.org/AbsentSemicolon/node-test-helpers/develop#info=devDependencies
[devdependencies-image]: https://david-dm.org/AbsentSemicolon/node-test-helpers/develop/dev-status.png
[Dependencies]: https://david-dm.org/absentsemicolon/node-test-helpers/develop
[dependencies-image]: https://david-dm.org/absentsemicolon/node-test-helpers/develop.png
[Jasmine]: https://jasmine.github.io/
[Jasmine-Node]: https://www.npmjs.com/package/jasmine-node
[Node.js]: https://nodejs.org
[travis-image]: https://secure.travis-ci.org/AbsentSemicolon/node-test-helpers.png
[Travis CI]: http://travis-ci.org/AbsentSemicolon/node-test-helpers

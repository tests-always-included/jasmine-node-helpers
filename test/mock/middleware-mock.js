"use strict";

module.exports = () => {
    return (server) => {
        return (res, req, next) => {
            var promise;

            promise = new Promise();
            promise.then(() => {
                return next(true);
            }, () => {
                return next(false);
            });
        };
    };
};

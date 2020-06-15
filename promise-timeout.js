const PromiseTimeoutError = require('./Error/PromiseTimeoutError');

/**
 * Creates a Promise with a timeout
 *
 * @alias module:TimedPromise
 * @param {Promise} promise
 * @param {Number} timeout
 * @returns Promise
 */
function TimedPromise (promise, timeout) {

    return new Promise((resolve, reject) => {

        const timeoutId = setTimeout(() => {
            if (this.onTimeout) {
                this.onTimeout.call(this);
            }
            reject(this.raiseError());
        }, timeout);

        promise.then(
            (result) => {
                clearTimeout(timeoutId);
                resolve(result);
            },
            (err) => {
                clearTimeout(timeoutId);
                reject(err);
            },
        );
    });
}

TimedPromise.prototype.Error = PromiseTimeoutError;
TimedPromise.prototype.onTimeout = null;

/**
 * @module TimedPromise
 */
module.exports = TimedPromise;

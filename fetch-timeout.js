const TimedPromise = require('./promise-timeout');
const FetchTimeoutError = require('./Error/FetchTimeoutError');

/**
 * @typedef {Object} FetchOptions
 * @property {String} method
 *
 */

/**
 * Adds the missing network timeout feature from the Fetch API.
 *
 * @param {String} url
 * @param {FetchOptions} options
 * @param {Number} timeout
 * @returns TimedPromise
 */
function fetchWithTimeout (url, options, timeout) {

    const controller = new AbortController();
    const { signal } = controller;
    const callback = () => controller.abort();

    const timedPromise = new TimedPromise(
        fetch(url, { ...options, ...signal }),
        timeout,
    );

    timedPromise.Error = FetchTimeoutError;
    timedPromise.onTimeout = callback;

    return timedPromise;
}

/**
 * @module fetchWithTimeout
 */
module.exports = fetchWithTimeout;

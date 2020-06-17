const TimedPromise = require('../promise-timeout');

/**
 * Fetch API
 * @typedef {Object} FetchOptions
 * @property {String} method
 * @property {Object?} headers
 * @property {Blob|BufferSource|FormData|URLSearchParams|USVString|ReadableStream?} body
 * @property {String?} mode
 * @property {String|FederatedCredential|PasswordCredential?} credentials
 * @property {String?} cache
 * @property {String?} redirect
 * @property {USVString?} referrer
 * @property {String?} referrerPolicy
 * @property {String?} integrity
 * @property {Boolean?} keepAlive
 * @property {AbortSignal?} signal
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

    let controller = null;

    if (!options.signal) {
        controller = new AbortController();
    }

    const { signal = options.signal } = controller;

    const timedPromise = new TimedPromise(
        fetch(url, { ...options, ...signal }),
        timeout,
    ).catch((err) => {
        if (controller) {
            controller.abort();
        }
        throw err;
    });

    return timedPromise;
}

/**
 * @module fetchWithTimeout
 */
module.exports = fetchWithTimeout;

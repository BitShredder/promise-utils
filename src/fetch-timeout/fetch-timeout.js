const TimedPromise = require('../promise-timeout/promise-timeout');

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
function fetchWithTimeout (url, options, timeout = 15) {

    if (arguments.length < 3
        || typeof url !== 'string'
        || typeof options !== 'object'
        || typeof timeout !== 'number'
        || !options.method
    ) {
        throw new TypeError('Invalid arguments');
    }

    const controller = !options.signal
        ? new AbortController()
        : null;

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

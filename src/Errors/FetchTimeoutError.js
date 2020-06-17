/**
 * FetchTimeoutError constructor
 *
 * @constructor
 */
function FetchTimeoutError () {

    if (!(this instanceof FetchTimeoutError)) {
        throw new Error('Constructor must be called with "new" keyword');
    }

    this.call(Error);
    this.stack = Error().stack;
    this.message = 'Fetch request timed out';
}

FetchTimeoutError.prototype = Object.create(Error.prototype);
FetchTimeoutError.prototype.name = 'FetchTimeoutError';

module.exports = FetchTimeoutError;

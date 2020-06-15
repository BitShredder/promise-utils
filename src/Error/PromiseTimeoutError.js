/**
 * Error object for timed out promises
 *
 * @constructor
 */
function PromiseTimeoutError () {

    if (!(this instanceof PromiseTimeoutError)) {
        throw new Error('Constructor must be called with "new" keyword');
    }

    Error.call(this);
    this.stack = Error.stack();
    this.message = 'Promise timed out';
}

PromiseTimeoutError.prototype = Object.create(Error.prototype);
PromiseTimeoutError.name = 'PromiseTimeoutError';

module.exports = PromiseTimeoutError;

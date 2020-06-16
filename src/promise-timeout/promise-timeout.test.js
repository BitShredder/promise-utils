/* eslint-env mocha */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
const { expect } = require('chai');
const TimedPromise = require('.');
const PromiseTimeoutError = require('../Errors/PromiseTimeoutError');

describe('TimedPromise', function () {

    it('Throws a PromiseTimeoutError when async method exceeds timeout', async function () {

        const promise = new Promise((resolve) => {
            setTimeout(() => resolve(true), 200);
        });

        try {
            await new TimedPromise(promise, 100);
        } catch (err) {
            expect(err).to.be.instanceOf(PromiseTimeoutError);
        }

    });

    it('Allows a Promise to resolve when async method does not exceed timeout', async function () {

        const promise = new Promise((resolve) => {
            setTimeout(() => resolve('resolved'), 100);
        });

        const result = await new TimedPromise(promise, 200);
        expect(result).to.equal('resolved');

    });

});

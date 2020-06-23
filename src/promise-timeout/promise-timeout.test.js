/* eslint-env mocha */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
const chai = require('chai');
const { expect } = require('chai');
const chaiAsPromised = require('chai-as-promised');

const TimedPromise = require('.');
const PromiseTimeoutError = require('../Errors/PromiseTimeoutError');

chai.use(chaiAsPromised);

describe('TimedPromise', function () {

    it('Throws a PromiseTimeoutError when promise does not resolve before the timeout', async function () {

        const promise = new Promise((resolve) => {
            setTimeout(() => resolve(true), 200);
        });

        expect(new TimedPromise(promise, 100)).to.eventually
            .be.rejectedWith('Promise timed out')
            .and.be.an.instanceOf(PromiseTimeoutError);

    });

    it('Allows Promise to resolve before timeout is reached', async function () {

        const promise = new Promise((resolve) => {
            setTimeout(() => resolve('resolved'), 100);
        });

        expect(new TimedPromise(promise, 200)).to.eventually
            .equal('resolved');

    });

});

/* eslint-env mocha */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
const chai = require('chai');
const { expect } = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const jsdom = require('mocha-jsdom');

const fetchWithTimeout = require('.');
const PromiseTimeoutError = require('../Errors/PromiseTimeoutError');

chai.use(chaiAsPromised);

describe('fetchWithTimeout', function () {

    jsdom({ url: 'http://localhost' });

    this.beforeAll(() => {
        global.fetch = sinon.stub().callsFake(() => (
            new Promise((resolve) => setTimeout(() => resolve('OK'), 200))
        ));
    });

    this.afterAll(() => {
        sinon.restore();
    });

    it('Throws a PromiseTimeoutError when a fetch request exceeds the timeout', async function () {

        expect(fetchWithTimeout('http://localhost/fetch', { method: 'GET' }, 100)).to.eventually
            .be.rejectedWith('Promise timed out')
            .and.be.an.instanceOf(PromiseTimeoutError);

    });

    it('Returns Promise when a fetch request completes before the timeout', async function () {

        expect(fetchWithTimeout('http://localhost/fetch', { method: 'GET' }, 300)).to.eventually
            .equal('OK');
    });

});

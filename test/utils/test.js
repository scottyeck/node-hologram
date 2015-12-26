'use strict';

var expect = require('chai').expect,
	_ = require('lodash');

function testMain(result, expected, method, ops) {

	method = method || _.isEqual;

	if (ops && ops.verbose) {
		console.log('RESULT', result);
		console.log('EXPECTED', expected);
	}

	expect(method(result, expected)).to.be.true;
}

function testVerbose(result, expected, method) {
	testMain(result, expected, method, { verbose: true });
}

var test = testMain;
test.verbose = testVerbose;

module.exports = test;
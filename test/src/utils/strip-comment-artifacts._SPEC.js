'use strict';

var rfr = require('rfr'),
	expect = require('chai').expect,
	util = require('util'),
	_ = require('lodash');

var stripCommentArtifacts = rfr('src/utils/strip-comment-artifacts');

function testVerbose(input, expected) {
	test(input, expected, {
		verbose: true
	});
}

function test(input, expected, ops) {
	var result = stripCommentArtifacts(input);

	if (ops && ops.verbose) {
		console.log('EXPECTED', expected);
		console.log('RESULT', result);
	}

	expect(_.isEqual(result, expected)).to.be.true;
}

describe('stripCommentArtifacts()', function() {

	it('It strips the beginning/end of comment blocks.', function() {
		test('//doc', '');
		test('/*doc', '');
		test('//enddoc', '');
		test('*/', '');
	});

	it('It removes artifacts from single-line style comments.', function() {
		test('\n//---', '\n---');
	});
});
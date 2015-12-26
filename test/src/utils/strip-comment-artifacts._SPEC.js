'use strict';

var rfr = require('rfr'),
	expect = require('chai').expect,
	util = require('util'),
	_ = require('lodash');

var test = rfr('test/utils/test'),
	stripCommentArtifacts = rfr('src/utils/strip-comment-artifacts');

describe('stripCommentArtifacts()', function() {

	it('It strips the beginning/end of comment blocks.', function() {
		test(stripCommentArtifacts('//doc'), '');
		test(stripCommentArtifacts('//doc'), '');
		test(stripCommentArtifacts('/*doc'), '');
		test(stripCommentArtifacts('//enddoc'), '');
		test(stripCommentArtifacts('*/'), '');
	});

	it('It removes artifacts from single-line style comments.', function() {
		test(stripCommentArtifacts('\n//---'), '\n---');
	});
});
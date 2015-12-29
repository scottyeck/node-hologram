'use strict';

var expect = require('chai').expect,
	_ = require('lodash'),
	rfr = require('rfr');

var processFile = rfr('src/utils/process-file'),
	test = rfr('test/utils/test');

describe('processFile()', function() {

	it('It operates as intended.', function() {

		var result = processFile('test/in/basic.scss', {
			commentStyle: 'block'
		}),
			expected = rfr('test/expected/basic.json');

		test(result, expected);
	});

	it('It processes blocks using single-line comment styles as intended.', function() {
		var result = processFile('test/in/basic-single-line.scss', {
			commentStyle: 'single-line'
		}),
			expected = rfr('test/expected/basic-single-line.json');

		test(result, expected);
	});

	it('It processes blocks with markdown rendered as desired.', function() {
		var result = processFile('test/in/markdown.scss', {
			commentStyle: 'block'
		}),
			expected = rfr('test/expected/markdown.json');

		test(result, expected);
	});

	it('It processes blocks with code-blocks in markdown rendered as desired.', function() {
		var result = processFile('test/in/component.scss', {
			commentStyle: 'block'
		}),
			expected = rfr('test/expected/component.js');

		test.verbose(result, expected);
	});
});


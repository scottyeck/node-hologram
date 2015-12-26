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

		test(expected, result);
	});

	it('It processes blocks using single-line comment styles as intended.', function() {
		var result = processFile('test/in/basic-single-line.scss', {
			commentStyle: 'single-line'
		}),
			expected = rfr('test/expected/basic-single-line.json');

		test(expected, result);
	});
});


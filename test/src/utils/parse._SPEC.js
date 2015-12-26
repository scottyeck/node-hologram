'use strict';

var expect = require('chai').expect,
	_ = require('lodash'),
	rfr = require('rfr');

var parse = rfr('src/utils/parse'),
	test = rfr('test/utils/test');

describe('parse()', function() {

	it('It operates as intended.', function() {

		var result = parse('test/in/basic.scss', {
			commentStyle: 'block'
		}),
			expected = rfr('test/expected/basic.json');

		test(expected, result);
	});

	it('It parses blocks using single-line comment styles as intended.', function() {
		var result = parse('test/in/basic-single-line.scss', {
			commentStyle: 'single-line'
		}),
			expected = rfr('test/expected/basic-single-line.json');

		test(expected, result);
	});
});

'use strict';

var expect = require('chai').expect,
	rfr = require('rfr');

var NodeHologram = rfr('src/node-hologram'),
	test = rfr('test/utils/test');

describe('NodeHologram', function() {

	it('It throws an error when incorrect args are provided.', function() {
		expect(function() {
			var bad = new NodeHologram();
		}).to.throw();
	});

	describe('.parse()', function() {

		it('It parses source as expected.', function() {

			var nh = new NodeHologram('test/in/multiple/**/*.scss');

			var result = nh.parse(),
				expected = rfr('test/expected/multiple.json');

			test(result, expected);
		});
	});
});
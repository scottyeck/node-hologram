'use strict';

var expect = require('chai').expect,
	rfr = require('rfr');

var NodeHologram = rfr('src/node-hologram');

describe('NodeHologram()', function() {

	it('It globs source upon instantiation.', function() {
		var good = new NodeHologram('../in/*.scss');
		expect(good.files).to.be.ok;
	});

	it('It throws an error when incorrect args are provided.', function() {
		expect(function() {
			var bad = new NodeHologram();
		}).to.throw();
	});
});
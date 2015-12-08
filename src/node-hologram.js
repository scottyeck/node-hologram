'use strict';

var _ = require('lodash'),
	glob = require('glob');

function NodeHologram(src, ops) {

	if (_.isUndefined(src)) {
		throw Error('NodeHologram must be instantiated with arg `src`.');
	}

	this.files = glob.sync(src);
}

module.exports = NodeHologram;
'use strict';

var _ = require('lodash'),
	glob = require('glob'),
	rfr = require('rfr');

var processFile = rfr('src/utils/process-file');

var options = {};

function NodeHologram(src, ops) {

	if (_.isUndefined(src)) {
		throw Error('NodeHologram must be instantiated with arg `src`.');
	}

	this.src = src;
}

NodeHologram.prototype.parse = function() {

	var files = glob.sync(this.src),
		result = [];

	_.each(files, function(fileString) {
		result.push(processFile(fileString));
	});

	return result;
}

module.exports = NodeHologram;
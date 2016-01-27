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

NodeHologram.prototype.categorize = function() {

	var files = glob.sync(this.src),
		result = {
			categories: [],
			config: {}
		};

	_.each(files, function(fileString) {

		var blocks = processFile(fileString);

		_.each(blocks, function(block) {
			var categoryName = block.category;

			if (_.isUndefined(result.config[categoryName])) {
				result.categories.push(categoryName);
				result.config[categoryName] = [];
			}

			result.config[categoryName].push(block);
		});
	});

	return result;
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
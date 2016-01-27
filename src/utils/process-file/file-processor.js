'use strict';

var fs = require('fs'),
	_ = require('lodash'),
	_s = require('underscore.string'),
	rfr = require('rfr');

var stripCommentArtifacts = rfr('src/utils/strip-comment-artifacts'),
	processMarkdown = rfr('src/utils/process-markdown');

/*
 * Utility methods
 */

function removeEmptyStringEntries(arr) {
	var result = _.filter(arr, function(entry) {
		return entry.length > 0;
	});
	return result;
}

/*
 * File Processor
 */

var DEFAULTS = {
	commentStyle: 'block'
};

function FileProcessor(options) {
	options = options || {};
	this.options = _.extend({}, DEFAULTS, options);
}

FileProcessor.prototype.isolateBlockCommentBlocks = function(fileContents) {

	var result = fileContents.match(/\/\*doc([\s\S]*?)\*\//g);
	result = removeEmptyStringEntries(result);

	return result;
}

FileProcessor.prototype.isolateSingleLineCommentBlocks = function(fileContents) {

	/*
	 * Removes non-commented code
	 */
	var result = fileContents.replace(/(?:\n)([^\/]+)/g, '\n');
	result = removeEmptyStringEntries(result.split('//doc'));
	return result;
}

FileProcessor.prototype.isolateBlocks = function(fileContents) {

	var commentStyle = this.options.commentStyle;

	if (commentStyle === 'block') {
		return this.isolateBlockCommentBlocks(fileContents);
	} else if (commentStyle === 'single-line') {
		return this.isolateSingleLineCommentBlocks(fileContents);
	} else {
		// TODO
		throw Error('Improper comment-style specified.');
	}
}

FileProcessor.prototype.isolateBlockMetadata = function(blockContents) {

	return blockContents.split('---')[1];
}

FileProcessor.prototype.isolateBlockMarkdown = function(blockContents) {

	var markdown = blockContents.split('---').slice(-1)[0];
	return _s.trim(markdown);
}

FileProcessor.prototype.htmlifyBlockMarkdown = function(markdownString) {

	var result = processMarkdown(markdownString);
	result = result.replace(/\n/g, '');
	return result;
}

FileProcessor.prototype.processBlockMetadata = function(metaContents) {

	var lines = metaContents.split('\n');

	var result = {};

	_.each(lines, function(line) {
		if (line.length > 0) {
			var tokens = line.split(': ');
			result[tokens[0]] = tokens[1];
		}
	});

	return result;
}

FileProcessor.prototype.processBlock = function(blockContents) {

	var stripped = stripCommentArtifacts(blockContents);

	var _meta = this.isolateBlockMetadata(stripped);
	var meta = this.processBlockMetadata(_meta);
	var markdownString = this.isolateBlockMarkdown(stripped);
	var html = this.htmlifyBlockMarkdown(markdownString);

	var result = _.extend({}, meta, {
		contents: html
	});
	return result;
}

FileProcessor.prototype.processFile = function(file) {

	var self = this;

	var fileContents = fs.readFileSync(file, 'utf-8');
	var blocks = this.isolateBlocks(fileContents);

	var result = [];

	_.each(blocks, function(block) {
		result.push(self.processBlock(block));
	});

	return result;
}

module.exports = FileProcessor;
'use strict';

var fs = require('fs'),
	_ = require('lodash'),
	_s = require('underscore.string'),
	rfr = require('rfr');

var stripCommentArtifacts = rfr('src/utils/strip-comment-artifacts'),
	processMarkdown = rfr('src/utils/process-markdown');

var isolateBlocks;

function removeEmptyStringEntries(arr) {
	var result = _.filter(arr, function(entry) {
		return entry.length > 0;
	});
	return result;
}

function isolateBlocksCommentBlocks(fileContents) {
	var result = fileContents.match(/\/\*doc([^/]+)\*\//g);
	result = removeEmptyStringEntries(result);
	return result;
}

function isolateSingleLineCommentBlocks(fileContents) {
	/*
	 * Removes non-commented code
	 */
	var result = fileContents.replace(/(?:\n)([^\/]+)/g, '\n');
	result = removeEmptyStringEntries(result.split('//doc'));
	return result;
}

function genericIsolateBlocks(commentStyle, fileContents) {
	if (commentStyle === 'block') {
		return isolateBlocksCommentBlocks(fileContents);
	} else if (commentStyle === 'single-line') {
		return isolateSingleLineCommentBlocks(fileContents);
	} else {
		// TODO
		throw Error('Improper comment-style specified.');
	}
}

function isolateBlockMetadata(blockContents) {
	return blockContents.split('---')[1];
}

function isolateBlockMarkdown(blockContents) {
	var markdown = blockContents.split('---').slice(-1)[0];
	return _s.trim(markdown);
}

function htmlifyBlockMarkdown(markdownString) {
	return processMarkdown(markdownString);
}

function processBlockMetadata(metaContents) {
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

function processBlock(blockContents) {
	var stripped = stripCommentArtifacts(blockContents);

	var _meta = isolateBlockMetadata(stripped);
	var meta = processBlockMetadata(_meta);
	var markdownString = isolateBlockMarkdown(stripped);
	var html = htmlifyBlockMarkdown(markdownString);

	var result = _.extend({}, meta, {
		contents: html
	});
	return result;
}

function processFile(file, options) {

	isolateBlocks = _.partial(genericIsolateBlocks, options.commentStyle);

	var fileContents = fs.readFileSync(file, 'utf-8');
	var blocks = isolateBlocks(fileContents);

	var result = [];

	_.each(blocks, function(block) {
		result.push(processBlock(block));
	});

	return result;
}

module.exports = processFile;
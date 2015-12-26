'use strict';

var fs = require('fs'),
	_ = require('lodash'),
	_s = require('underscore.string');

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

function stripCommentArtifacts(str) {
	str = str
		.replace(/\/\*doc/g, '')
		.replace(/\/\/doc/g, '')
		.replace(/\/\/enddoc/g, '')
		.replace(/\n\/\/\s/g, '\n')
		.replace(/\*\//g, '');

	return str;
}

function parseBlockMetadata(metaContents) {
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

function parseBlock(blockContents) {
	var stripped = stripCommentArtifacts(blockContents);

	var _meta = isolateBlockMetadata(stripped);
	var meta = parseBlockMetadata(_meta);
	var markdown = isolateBlockMarkdown(stripped);

	var result = _.extend({}, meta, {
		contents: markdown
	});
	return result;
}

function parse(file, options) {

	isolateBlocks = _.partial(genericIsolateBlocks, options.commentStyle);

	var fileContents = fs.readFileSync(file, 'utf-8');
	var blocks = isolateBlocks(fileContents);

	var result = [];

	_.each(blocks, function(block) {
		result.push(parseBlock(block));
	});

	return result;
}

module.exports = parse;
'use strict';

var fs = require('fs'),
	_ = require('lodash'),
	_s = require('underscore.string');

var isolateBlocks;

function isolateBlocksCommentBlocks(fileContents) {
	return fileContents.match(/\/\*doc([^/]+)\*\//g);
}

function isolateSingleLineCommentBlocks(fileContents) {
	return fileContents.match(/\/\/doc(.|\n)*\/\/cod/);
}

function genericIsolateBlocks(commentStyle, fileContents) {
	if (commentStyle === 'block') {
		return isolateBlocksCommentBlocks(fileContents);
	} else if (commentStyle === 'single-line') {
		return isolateSingleLineCommentBlocks(fileContents);
	} else {
		// TODO
		throw Error();
	}
}

function isolateBlockMetadata(blockContents) {
	var meta = blockContents.match(/---([^/*]+)---/);
	return meta['1'];
}

function isolateBlockMarkdown(blockContents) {
	var markdown = blockContents.split('---').slice(-1)[0];
	return _s.trim(markdown);
}

function stripCommentArtifacts(str) {
	str = str
		.replace(/\/\*doc/, '')
		.replace(/\*\//, '');
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
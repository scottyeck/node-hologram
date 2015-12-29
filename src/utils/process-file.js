'use strict';

var fs = require('fs'),
	_ = require('lodash'),
	_s = require('underscore.string'),
	rfr = require('rfr');

var FileProcessor = rfr('src/utils/process-file/file-processor');

function processFile(file, options) {
	var fp = new FileProcessor(options);
	return fp.processFile(file);
}

module.exports = processFile;
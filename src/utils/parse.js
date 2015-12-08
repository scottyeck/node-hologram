'use strict';

var fs = require('fs');

function parse(file) {

	var fileContents = fs.readFileSync(file, 'utf-8');

	console.log(fileContents);
}

module.exports = parse;
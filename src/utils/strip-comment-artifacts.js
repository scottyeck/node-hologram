'use strict';

/*
 * Utility used to strip hologram-style comment artifacts from text
 * so as to expose remaining relevant data.
 */

function stripCommentArtifacts(str) {
	str = str
		.replace(/\/\*doc/g, '')
		.replace(/\/\/doc/g, '')
		.replace(/\/\/enddoc/g, '')
		.replace(/\n\/\/\s/g, '\n')
		.replace(/\n\/\//g, '\n')
		.replace(/\*\//g, '');

	return str;
}

module.exports = stripCommentArtifacts;
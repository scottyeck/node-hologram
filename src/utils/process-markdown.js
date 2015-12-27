'use strict';

var marked = require('marked'),
	renderer = new marked.Renderer();

renderer.heading = function(text, level, raw) {
  return '<h'
    + level
    + '>'
    + text
    + '</h'
    + level
    + '>\n';
};

function processMarkdown(markdownString) {
	return marked(markdownString, {
		renderer: renderer
	});
}

module.exports = processMarkdown;
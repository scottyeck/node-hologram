'use strict';

var marked = require('marked'),
renderer = new marked.Renderer();

var Entities = require('html-entities').XmlEntities;
var entities = new Entities();

renderer.heading = function(text, level, raw) {
	return '<h'
	+ level
	+ '>'
	+ text
	+ '</h'
	+ level
	+ '>\n';
};

renderer.code = function(code, lang, escaped) {

	var result = '';

	if (this.options.highlight) {
		var out = this.options.highlight(code, lang);
		if (out != null && out !== code) {
			escaped = true;
			code = out;
		}
	}

	if (!lang) {
		return '<pre><code>'
		+ (escaped ? code : entities.encode(code))
		+ '\n</code></pre>';
	}

	if (lang === 'html_example') {
		result += ['<div class="html-example">', code, '</div>'].join('\n');
	}

	result +='<pre><code class="'
	+ this.options.langPrefix
	+ escape(lang, true)
	+ '">'
	+ (escaped ? code : entities.encode(code))
	+ '\n</code></pre>\n';

	return result;
};

function processMarkdown(markdownString) {
	return marked(markdownString, {
		renderer: renderer
	});
}

module.exports = processMarkdown;
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

renderer.code = function(code, lang, escaped) {

	if (this.options.highlight) {
		var out = this.options.highlight(code, lang);
		if (out != null && out !== code) {
			escaped = true;
			code = out;
		}
	}

	if (!lang) {
		return '<pre><code>'
		+ (escaped ? code : escape(code, true))
		+ '\n</code></pre>';
	}

	return '<pre><code class="'
	+ this.options.langPrefix
	+ escape(lang, true)
	+ '">'
	+ (escaped ? code : escape(code, true))
	+ '\n</code></pre>\n';
};

function processMarkdown(markdownString) {
	return marked(markdownString, {
		renderer: renderer
	});
}

module.exports = processMarkdown;
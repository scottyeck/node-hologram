'use strict';

var Entities = require('html-entities').XmlEntities;

var entities = new Entities();

var contents = [
	'<p>A basic button can be created with minimal markup.</p>',
	'<div class="html-example">',
		'<!-- Anchors (links) -->',
		'<a href="#" class="button">Link Button</a>',

		'<!-- Buttons (actions) -->',
		'<button class="button">Action Button</button>',
	'</div>',
	'<pre><code class="lang-html_example">',
		entities.encode('<!-- Anchors (links) -->'),
		entities.encode('<a href="#" class="button">Link Button</a>'),
		entities.encode('<!-- Buttons (actions) -->'),
		entities.encode('<button class="button">Action Button</button>'),
	'</code></pre>'
].join('');

module.exports = [{
	'title': 'Buttons',
	'name': '01-buttons',
	'contents': contents,
	'category': 'buttons'
}];
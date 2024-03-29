define(function (require) {
	var skills = [
		{
			id: 'java',
			type: 'language',
			description: 'Object-orientated programming language',
		},
		{
			id: 'javascript',
			type: 'language',
			description:
				'Most popular scripting language, supported on 99%+ web browsers',
			url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
		},
		{
			id: 'php',
			type: 'language',
			url: 'http://www.php.net',
			description:
				'Popular scripting language common among web applications',
		},
		{
			id: 'css',
			type: 'language',
			description: 'Cascading Style Sheets',
		},
		{
			id: 'mysql',
			type: 'datastore',
			url: 'http://www.mysql.com',
			description: 'Popular relational database',
		},
		{
			id: 'jquery',
			type: 'library',
			related: ['javascript'],
			url: 'http://www.jquery.com',
		},
		{
			id: 'mvc',
			type: 'design pattern',
			description: 'Model-view-controller',
			url:
				'http://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller',
		},
		{
			id: 'git',
			type: 'version control',
			url: 'http://git-scm.com/',
			description: 'Distributed version control.',
		},
		{
			id: 'd3',
			type: 'library',
			related: ['javascript', 'svg'],
			url: 'http://d3js.org/',
			description:
				'Data driven documents: a javascript library for manipulating data and displaying it in HTML or SVG',
		},
		{
			id: 'backbone.js',
			type: 'library',
			related: ['javascript', 'jquery', 'underscore.js'],
			url: 'http://backbonejs.org/',
		},
		{
			id: 'capistrano',
			type: 'utility',
			description:
				'Tool for deploying code to production servers from a repository',
			url: 'http://capistranorb.com/',
		},
		{
			id: 'dhtmlx',
			type: 'library',
			description: 'Flash based charting library',
			url: 'http://dhtmlx.com/',
		},
		{
			id: 'prototype.js',
			type: 'library',
			url: 'http://prototypejs.org/',
			description:
				'Precursor to jQuery and Underscore.js.  Fell out of favor for polluting the global scope',
			related: ['javascript'],
		},
		{
			id: 'svn',
			type: 'version control',
			url: 'http://subversion.apache.org/',
			description:
				'Centralized version control, developed as a replacement for CVS',
		},
		{
			id: 'agile',
			type: 'software development process',
			url: 'http://en.wikipedia.org/wiki/Agile_software_development',
		},
		{
			id: 'perl',
			type: 'language',
			description: 'Older scripting language.',
			url: 'http://www.perl.org/',
		},
		{
			id: 'marionette.js',
			type: 'framework',
			related: ['javascript', 'backbone.js', 'mvc'],
			url: 'http://marionettejs.com/',
			description:
				'Rounds backbone.js into a full MVC framework by adding, among other things, a dedicated application and controller object',
		},
		{
			id: 'postgres',
			type: 'datastore',
			url: 'http://www.postgresql.org/',
			description: 'Respected relational database.',
		},
		{
			id: 'sass',
			type: 'library',
			url: 'http://sass-lang.com/',
			related: ['css'],
			description:
				'CSS pre-processor.  Turns CSS into a scripting language with variables and programatic logic.',
		},
		{
			id: 'jasmine.js',
			type: 'utility',
			description: 'Unit testing framework for javascript',
			related: ['javascript'],
			url: 'http://pivotal.github.io/jasmine/',
		},
		{
			id: 'extjs',
			type: 'library',
			description: 'Now known as sencha touch.',
			url: 'http://www.sencha.com/',
		},
		{
			id: 'cakephp',
			type: 'framework',
			related: ['php', 'mvc'],
			url: 'http://cakephp.org/',
		},
		{
			id: 'puppet',
			type: 'utility',
			description:
				'*nix system manager.  Can be used to manage a range of servers',
			url: 'http://puppetlabs.com/',
		},
		{
			id: 'docpad',
			type: 'utility',
			description:
				'Node.js static site generator which utilizes server-side backbone.js',
			related: ['node.js', 'backbone.js'],
			url: 'http://docpad.org',
		},
		{
			id: 'spring',
			type: 'framework',
			related: ['java'],
			url: 'https://spring.io',
		},
		{
			id: 'react.js',
			type: 'library',
			related: ['javascript'],
		},
		{
			id: 'bamboo',
			type: 'utility',
		},
		{
			id: 'graphql',
			type: 'framework',
			related: ['javascript'],
		},
		{
			id: 'kotlin',
			type: 'language',
			related: ['java'],
		},
		{
			id: 'redshift',
			type: 'database',
			related: ['aws'],
		},
		{
			id: 'aws',
		},
		{
			id: 'atomic design',
			url: 'https://atomicdesign.bradfrost.com',
		},
	];

	return skills;
});

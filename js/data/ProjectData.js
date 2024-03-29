define(function (require) {
	var projects = [
		{
			title: 'This Site!',
			url: 'http://www.christopherbroome.com',
			skills: [
				'javascript',
				'backbone.js',
				'marionette.js',
				'jquery',
				'd3',
				'css',
				'mvc',
				'git',
				'capistrano',
			],
			status: 'active',
			description: 'A little experiment in Marionette and D3.js',
		},

		{
			title: 'CDC Prime Report Stream',
			url: 'https://github.com/cbroome/prime-data-hub',
			skills: ['kotlin'],
			status: 'active',
			description:
				"Coordinated through US Digital Response, added FTPS support to the CDC's Report Stream project to retrieve Covid statistics",
		},

		{
			title: 'Mobile Device Browser',
			url: 'http://www.mobiledevicebrowser.com',
			skills: [
				'javascript',
				'dhtmlx',
				'prototype.js',
				'mysql',
				'php',
				'css',
			],
			status: 'inactive',
			description:
				'Attempt at a Web 2.0 browser of the open source WURFL database.  Worked stopped after WURFL licensing changed.',
		},

		{
			title: 'Dither and Bicker',
			url: 'http://www.ditherandbicker.com',
			skills: ['docpad', 'css', 'capistrano', 'git', 'backbone.js'],
			status: 'active',
			description: 'A seldomly updated tech-blog',
		},
	];

	return projects;
});

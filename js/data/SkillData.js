define( function( require ) {
    
    var skills = [
        { 
            id: 'javascript',
            type: 'language'
        },
        {
            id: 'php',
            type: 'language',
            url: 'http://www.php.net'
        },
        {
            id: 'css',
            type: 'language'
        },
        {
            id: 'html5',
            type: 'language'
        },
        {
            id: 'mysql',
            type: 'datastore',
            url: 'http://www.mysql.com'
        },
        {
            id: 'jquery',
            type: 'library',
            related: [ 'javascript' ]
        },
        {
            id: 'mvc',
            type: 'design pattern'
        },
        {
            id: 'git',
            type: 'version control'
        },
        {
            id: 'd3',
            type: 'library',
            related: [ 'javascript', 'svg' ],
            url: 'http://d3js.org/'
        },
        {
            id: 'backbone.js',
            type: 'library',
            related: [ 'javascript', 'jquery', 'underscore.js' ],
            url: 'http://backbonejs.org/'
        },
        {
            id: 'capistrano',
            type: 'utility',
            description: 'Tool for deploying code to production servers from a repository',
            url: 'http://capistranorb.com/'
        },
        {
            id: 'dhtmlx',
            type: 'library',
            description: 'Flash based charting library',
            url: 'http://dhtmlx.com/'
        },
        {
            id: 'prototype.js',
            type: 'library',
            url: 'http://prototypejs.org/'
        },
        {
            id: 'svn', 
            type: 'version control'
        },
        {
            id: 'agile',
            type: 'management'
        },
        {
            id: 'perl',
            type: 'language'
        },
        {
            id: 'wordpress',
            type: 'blog',
            related: [ 'php' ],
            url: 'http://wordpress.org/'
        },
        {
            id: 'marionette.js',
            type: 'framework',
            related: [ 'javascript', 'backbone.js' ],
            url: 'http://marionettejs.com/'
        },
        {
            id: 'cassandra',
            type: 'datastore',
            url: 'http://cassandra.apache.org/'
        },
        {
            id: 'postgres',
            type: 'datastore'
        },
        {
            id: 'mercurial',
            type: 'version control'
        },
        {
            id: 'python',
            type: 'language'
        },
        {
            id: 'sass', 
            type: 'library',
            url: 'http://sass-lang.com/'
        },
        {
            id: 'jasmine.js',
            type: 'utility',
            description: 'Unit testing for javascript',
            related: [ 'javascript' ],
            url: 'http://pivotal.github.io/jasmine/' 
        },
        {
            id: 'extjs',
            type: 'library',
            description: 'Now known as sencha touch.',
            url: 'http://www.sencha.com/'
        },
        {
            id: 'cakephp',
            type: 'framework',
            related: [ 'php' ],
            url: 'http://cakephp.org/'
        },
        {
            id: 'puppet',
            type: 'utility',
            description: '*nix system manager.  Can be used to manage a range of servers',
            url: 'http://puppetlabs.com/'
        }
    ];
    
    return skills;
    
} );
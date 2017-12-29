define( function( require ) {
    
    var projects = [
        {
            "title": "This Site!",
            "url": "http://www.christopherbroome.com",
            "skills": [ "javascript", "backbone.js", "marionette.js", "jquery", "d3", "css", "mvc", "git", "capistrano", "require.js" ],
            "status": "active",
            "description": "A little experiment in Marionette and D3.js"
        },
    
        {
            "title": "Mobile Device Browser",
            "url": "http://www.mobiledevicebrowser.com",
            "skills": [ "javascript", "dhtmlx", "prototype.js", "mysql", "php", "css" ],
            "status": "inactive",
            "description": "Attempt at a Web 2.0 browser of the open source WURFL database.  Worked stopped after WURFL licensing changed."
        },
    
        {
            "title": "Dither and Bicker",
            "url": "http://www.ditherandbicker.com",
            "skills": [ "docpad", "css", "capistrano", "git", "backbone.js" ],
            "status": "active",
            "description": "A seldomly updated tech-blog"
        }
    ];
    
    return projects;
    
} );
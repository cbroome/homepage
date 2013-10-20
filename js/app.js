define(
    [
        'marionette'
    ],
    function ( Marionette ) {
        
        var app = new Marionette.Application();
        
        app.addRegions ({
            
            skillList: 'ul.skill-list',
            
            experienceWork: '.experience-work',
            
            experienceProjects: '.experience-projects'
        
        });
        
    
        
        app.on( 'start', function() {

            

        } );
        
        return app;
    }
);
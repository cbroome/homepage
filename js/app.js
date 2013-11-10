define(
    [
        'marionette',
        'backbone',
        'controller',

        'controller/MainController'
    ],
    function ( Marionette, Backbone, controller ) {

        var app = new Marionette.Application();

        app.addRegions ({

            skillList: 'ul.skill-list',

            experienceWork: '.experience-work',

            experienceProjects: '.experience-projects'

        });



        app.on( 'start', function() {

            Backbone.emulateJSON = true;
            var main = new controller.MainController();

        } );

        return app;
    }
);
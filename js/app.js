define( function ( require ) {

        var Marionette = require( 'marionette' ),
            Backbone = require( 'backbone' ),
            app = new Marionette.Application();

        app.addRegions ({

            skillList: 'ul.skill-list',

            experienceWork: '.experience-work',

            experienceProjects: '.experience-projects'

        });



        app.on( 'start', function() {

            var MainController =  require( 'controller/MainController' );

            Backbone.emulateJSON = true;
            var main = new MainController();

        } );


        // stupid IE < IE9
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim#Browser_compatibility
        if (!String.prototype.trim) {
          String.prototype.trim = function () {
            return this.replace(/^\s+|\s+$/gm, '');
          };
        }

        return app;
    }
);
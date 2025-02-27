require.config( {


    paths: {

        jquery: 'lib/jquery-1.10.2.min',

        underscore: 'lib/underscore-min',

        // backbone: 'lib/backbone-min',

        backbone: 'lib/backbone-debug',

        handlebars: 'lib/handlebars',

        marionette: 'lib/backbone.marionette.min',

        text: 'lib/requirejs_text/text',

        d3: 'lib/d3.v3.min'



    },


    shim: {

        jquery: {
            exports: '$',
        },

        underscore: {
            exports: '_'
        },

        backbone: {
            deps: [ 'underscore', 'jquery' ],
            exports: 'Backbone'
        },

        handlebars: {
            exports: 'Handlebars'
        },

        marionette : {
            deps: [ 'jquery', 'underscore', 'backbone' ],
            exports: 'Marionette'
        },

        d3: {
            exports: 'd3'
        }
    }


});

require(
    [ 'app' ],
    function ( app ) {
        app.start();

    }
);
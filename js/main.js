require.config( {


    paths: {
      
        jquery: 'lib/jquery-1.10.2.min',
        
        underscore: 'lib/underscore-min',
        
        backbone: 'lib/backbone-min',
        
        handlebars: 'lib/handlebars',
        
        marionette: 'lib/backbone.marionette.min.js'
        
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
            exports: 'handlebars'
        },
        
        marionette : {
            deps: [ 'jquery', 'underscore', 'backbone' ],
            exports: 'Marionette'
        }
    }
    
    
});

require(
    [
        'app',
        
        'jquery',
        'underscore',
        'backbone'

    ],
    function ( ) {
        
        // var m = new model.Experience(); 
        
        var a = new app();
        
    }
);
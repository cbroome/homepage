define(
    [
        'jquery',
        'backbone',
        'handlebars',
        
        'view'
    
    ],
    function ( $, Backbone, Handlebars ) {
        
        
        view.Base = Backbone.View.extend( {
        
        
            initialize: function( ) {
              
              console.log( 'initializing');
              
                
            },
            
            /**
             *
             */
            template: function( html, options ) {
               
               
                var template = Handlebars.compile( html );
                return template( options );
                
            }
        

        } );
        
        return view;
    }
);
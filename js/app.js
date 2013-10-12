define(
    [
        'backbone',
        
        
        
        'model/Experience',
        
        'view/Base'
    
    ],
    function ( Backbone, Experience ) {
        
        
        app = Backbone.View.extend( {
        
        
            initialize: function() {
              
              console.log( 'initializing');
              
              var e = new model.Experience();
                
            }
        

        } );
        
        return app;
    }
);
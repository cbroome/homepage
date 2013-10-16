define(
    [
        'backbone',
        
        
        
        'model/Experience',
        
        'view/Base',
        
        'controller/MainController'
    
    ],
    function ( Backbone, Experience ) {
        
        /**
         *
         *
         */
        app = Backbone.View.extend( {
        
        
            initialize: function() {
                
                // var e = new model.Experience();
                
                
                console.log( controller.MainController );
                var c = new controller.MainController();
                
            
            }
        

        } );
        
        return app;
    }
);
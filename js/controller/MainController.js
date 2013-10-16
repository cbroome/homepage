define(
    [
        'jquery',
        'backbone',
        'underscore',
        
        'controller',
        'controller/BaseController'
    
    ],
    function ( $, Backbone, _ ) {
        
        controller.MainController = function() {
            
        }
        
        /**
         *
         */
        
        /*
        controller.MainController = _.extend(
            {},
            controller.BaseController.prototype,
            {
             
                initialize: function() {
                    console.log( 'main controller!' );
                }
            }
        );
        */
        
        _.defaults(
            controller.MainController.prototype,
            controller.BaseController.prototype  
        );
        
        return controller.MainController;
    }
);
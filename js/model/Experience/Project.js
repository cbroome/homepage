define(
    [        
        'backbone',   
        'model',
        
        'model/Experience'
    ],
    function (Backbone, model ) {
        
        /**
         * Represents a standalone web site or application
         *
         */
        
        model.Experience.Project = model.Experience.extend( {
            
            
        
        } );

        return model.Experience.Project;
    }
);
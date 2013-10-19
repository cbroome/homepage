define(
    [        
        'backbone',   
        'model'
    ],
    function (Backbone, model ) {
        
        model.Experience.Work = model.Experience.extend( {
            
            /**
             * @property    {Datetime}  dateStart
             */
            dateStart: undefined,
            
            /**
             * @property    {Datetime}  dateEnd
             */
            dateEnd: undefined
            
        
        } );

        return model.Experience.Work;
    }
);
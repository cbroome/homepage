define( function ( require ) {

		var Backbone = require( 'backbone' ),
			ExperienceModel = require( 'model/ExperienceModel' ),
			ExperienceWorkModel;


        ExperienceWorkModel = ExperienceModel.extend( {

            /**
             * @property    {Datetime}  dateStart
             */
            dateStart: undefined,

            /**
             * @property    {Datetime}  dateEnd
             */
            dateEnd: undefined,

            /**
             * @property    {String}    urlRoot
             */
            urlRoot: 'service/work',
            
            initialize: function() {
            
                
                if( this.get( 'dates' ).end ) {
                    this.get( 'dates' ).endString = this._formatDate( this.get( 'dates' ).end );   
                }
                
                if( this.get( 'dates' ).start ) {
                    this.get( 'dates' ).startString = this._formatDate( this.get( 'dates' ).start );   
                }
                
                
            },
            
            
            /**
             * @param   {String}    date
             * @returns {String}
             */
            _formatDate: function( date ) {
                // date = date.toString().split( '' ).splice( 4, 0, '/' );
                var array = date.toString().split( '' );
                array.splice( 4, 0, '/' );
                return array.join( '' );
            }


        } );

        return ExperienceWorkModel;
    }
);
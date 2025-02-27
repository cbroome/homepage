define( function ( require ) {

		var Backbone = require( 'backbone' ),
			ExperienceModel = require( 'model/ExperienceModel' ),
			ExperienceProjectModel;

        /**
         * Represents a standalone web site or application
         *
         */

       ExperienceProjectModel = ExperienceModel.extend( {

            /**
             * @property    {String}    urlRoot
             */
            urlRoot: 'service/projects',
           
            initialize: function() {
                this.set( 'active', this.get( 'status' ) === 'active' );
            }
        } );

        return ExperienceProjectModel;
    }
);
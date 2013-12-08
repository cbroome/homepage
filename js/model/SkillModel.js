define(  function ( require ) {

		/**
		 * Really just a dummy model used for event binding...
		 *
		 */

        var Backbone = require( 'backbone' ),
			SkillModel = Backbone.Model.extend( {

            /**
             * @property    {Array}     skills
             */
            skill: undefined

        } );

        return SkillModel;
    }
);
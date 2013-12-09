define(  function ( require ) {

		/**
		 * Really just a dummy model used for event binding...
		 *
		 */

        var PositionModel = require( 'model/PositionModel' ),
			SkillModel;


		SkillModel = PositionModel.extend( {

            /**
             * @property    {Array}     skills
             */
            skill: undefined

        } );

        return SkillModel;
    }
);
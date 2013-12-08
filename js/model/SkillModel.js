define(
    [
        'backbone',
        'model'
    ],
    function (Backbone, model ) {

		/**
		 * Really just a dummy model used for event binding...
		 *
		 */

        SkillModel = Backbone.Model.extend( {

            /**
             * @property    {Array}     skills
             */
            skill: undefined

        } );

        return SkillModel;
    }
);
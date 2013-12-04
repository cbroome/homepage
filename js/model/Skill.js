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

        model.Skill = Backbone.Model.extend( {

            /**
             * @property    {Array}     skills
             */
            skill: undefined

        } );

        return model.Skill;
    }
);
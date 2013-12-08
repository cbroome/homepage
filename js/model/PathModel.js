define(
    [
		'underscore',
        'backbone',
		'd3',

        'model'
    ],
    function ( _, Backbone ) {


		PathModel = Backbone.Model.extend( {

			/**
			 * @property	{Object}	options
			 */
			options: {

				/**
				 * @property	{model.Skill}	skill
				 */
				skill: undefined,

				/**
				 * @property	{model.Experience}	experience
				 */
				experience: undefined

			},


			initialize: function() {



			}


        } );

        return PathModel;
    }
);
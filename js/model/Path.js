define(
    [
		'underscore',
        'backbone',
		'd3',

        'model',
		'view/Base'

    ],
    function ( _, Backbone ) {


        model.Path = Backbone.Model.extend( {

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

        return model.Path;
    }
);
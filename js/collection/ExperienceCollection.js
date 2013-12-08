define(
	[
		'backbone'
	],
	function( Backbone, collection ) {


		ExperienceCollection = Backbone.Collection.extend( {

			/**
			 * Return the values in custom sorted order.
			 *
			 * @returns		{Array}
			 */
			getSorted: function() {

			}

		} );

		return ExperienceCollection;

	}
);
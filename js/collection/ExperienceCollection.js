define(
	[
		'backbone',
		'collection'
	],
	function( Backbone, collection ) {


		collection.ExperienceCollection = Backbone.Collection.extend( {

			/**
			 * Return the values in custom sorted order.
			 *
			 * @returns		{Array}
			 */
			getSorted: function() {

			}

		} );

		return collection.ExperienceCollection;

	}
);
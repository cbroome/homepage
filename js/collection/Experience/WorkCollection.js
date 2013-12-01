define(
	[
		'backbone',
		'collection',

		'collection.experience',

		'collection/ExperienceCollection'
	],
	function( Backbone, collection ) {


		collection.Experience.WorkCollection = collection.ExperienceCollection.extend( {

			/**
			 * @property	{model.Experience.Work}	model
			 */
            model: model.Experience.Work,

			/**
			 * @property	{String}	url
			 */
			url: './service/work.json',

			/**
			 * Return the values in custom sorted order.
			 *
			 * @returns		{Array}
			 */
			getSorted: function() {
				return this.sortBy( function( job ) {
					return ( -1 * parseInt( job.get( 'dates' ).start ) );
				} );
			}

		} );

		return collection.Experience.WorkCollection;

	}
);
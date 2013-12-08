define(
	[
		'backbone',
		'collection',

		'collection.experience',

		'collection/ExperienceCollection',
		'model/Experience/WorkModel'
	],
	function( Backbone, collection ) {


		ExperienceWorkCollection = ExperienceCollection.extend( {

			/**
			 * @property	{ExperienceWorkModel}	model
			 */
            model: ExperienceWorkModel,

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

		return ExperienceWorkCollection;

	}
);
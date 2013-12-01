define(
	[
		'backbone',
		'collection',

		'collection.experience',

		'collection/ExperienceCollection'
	],
	function( Backbone, collection ) {


		collection.Experience.ProjectCollection = collection.ExperienceCollection.extend( {

			/**
			 * @property	{model.Experience.Project}	model
			 */
			model: model.Experience.Project,

			/**
			 * @property	{String}	url
			 */
			url: './service/projects.json',

			/**
			 * Return the values in custom sorted order.
			 *
			 * @returns		{Array}
			 */
			getSorted: function() {
				return this.sortBy( function( project ) {
					return ( project.get( 'status' ) === 'active' ) ? 0 : 1;
				} );
			}

		} );

		return collection.Experience.ProjectCollection;

	}
);
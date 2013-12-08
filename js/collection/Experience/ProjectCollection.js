define(
	[
		'backbone',
		'collection',

		'collection.experience',

		'collection/ExperienceCollection',
		'model/Experience/ProjectModel'
	],
	function( Backbone, collection ) {


		ExperienceProjectCollection = ExperienceCollection.extend( {

			/**
			 * @property	{model.Experience.Project}	model
			 */
			model: ExperienceProjectModel,

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

		return ExperienceProjectCollection;

	}
);
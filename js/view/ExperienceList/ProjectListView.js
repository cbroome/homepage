define(  function ( require ) {

		var $ = require( 'jquery' ),
			Backbone = require( 'backbone' ),
			ProjectListTemplate = require( 'text!view/ExperienceList/ProjectListTemplate.html' ),
			ExperienceListView = require( 'view/ExperienceListView' ),
			ExperienceProjectView = require( 'view/Experience/ProjectView' ),
			ExperienceListProjectListView;

        ExperienceListProjectListView = ExperienceListView.extend( {

			/**
			 * @property	{String}	WorkListTemplate
			 */
			htmlTemplate: ProjectListTemplate,

			/**
			 * @property	{view.Experience.Project}	experienceView
			 */
			experienceView: ExperienceProjectView,


			/**
			 *
			 * @returns	{Array}	work sorted by status flag
			 */
			getArray: function() {
				return this.collection.sortBy( function( project ) {
					return ( project.get( 'status' ) === 'active' ) ? 0 : 1;
				} );
			}

		} );

		return ExperienceListProjectListView;
	}
);
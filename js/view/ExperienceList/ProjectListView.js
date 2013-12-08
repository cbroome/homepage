define(
    [
        'jquery',
        'backbone',
		'text!view/ExperienceList/ProjectListTemplate.html',

        'view',
		'view/Experience/ProjectView',
		'view/ExperienceListView'

    ],
    function ( $, Backbone, ProjectListTemplate ) {


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
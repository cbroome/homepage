define(
    [
        'jquery',
        'backbone',
		'text!view/ExperienceList/ProjectListTemplate.html',

        'view',
		'view/Base',
		'view/Experience/Project',
		'view/ExperienceList'

    ],
    function ( $, Backbone, ProjectListTemplate ) {


        view.ExperienceList.ProjectList = view.ExperienceList.extend( {

			/**
			 * @property	{String}	WorkListTemplate
			 */
			htmlTemplate: ProjectListTemplate,

			/**
			 * @property	{view.Experience.Project}	experienceView
			 */
			experienceView: view.Experience.Project,


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

		return view.ExperienceList.ProjectList;
	}
);
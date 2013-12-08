define(
    [
        'jquery',
        'backbone',
		'text!view/ExperienceList/WorkListTemplate.html',

        'view',
		'view/Experience/WorkView',
		'view/ExperienceListView'

    ],
    function ( $, Backbone, WorkListTemplate ) {


        ExperienceListWorkListView = ExperienceListView.extend( {

			/**
			 * @property	{String}	WorkListTemplate
			 */
			htmlTemplate: WorkListTemplate,

			/**
			 * @property	{view.Experience.Work}	experienceView
			 */
			experienceView: ExperienceWorkView,


			/**
			 *
			 * @returns	{Array}	work sorted by start date...
			 */
			getArray: function() {
				return this.collection.sortBy( function( job ) {
					return ( -1 * parseInt( job.get( 'dates' ).start ) );
				} );
			}

		} );

		return ExperienceListWorkListView;
	}
);
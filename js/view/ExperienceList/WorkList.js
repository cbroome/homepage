define(
    [
        'jquery',
        'backbone',
		'text!view/ExperienceList/WorkListTemplate.html',

        'view',
		'view/Base',
		'view/Experience/Work',
		'view/ExperienceList'

    ],
    function ( $, Backbone, WorkListTemplate ) {


        view.ExperienceList.WorkList = view.ExperienceList.extend( {

			/**
			 * @property	{String}	WorkListTemplate
			 */
			htmlTemplate: WorkListTemplate,

			/**
			 * @property	{view.Experience.Work}	experienceView
			 */
			experienceView: view.Experience.Work,


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

		return view.ExperienceList.WorkListt;
	}
);
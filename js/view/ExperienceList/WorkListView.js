define(  function ( require ) {

		var $ = require( 'jquery' ),
			Backbone = require( 'backbone' ),
			WorkListTemplate = require( 'text!view/ExperienceList/WorkListTemplate.html' ),
			ExperienceWorkView = require( 'view/Experience/WorkView' ),
			ExperienceListView = require( 'view/ExperienceListView' ),
			ExperienceListWorkListView;

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
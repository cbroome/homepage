define( function( require ) {

	var _ = require( 'underscore' ),
		BaseView = require( 'view/BaseView' ),
		DetailProjectView = require( 'view/Detail/ProjectView' ),
		DetailWorkView = require( 'view/Detail/WorkView' ),
		DetailsView;

	DetailsView = BaseView.extend( {

		options: {

			/**
			 * @property	{ExperienceWorkCollection}	expWork
			 */
			expWork: undefined,

			/**
			 * @property	{ExperienceProjectCollection}	expProjects
			 */
			expProjects: undefined

		},


		initialize: function() {

			var _renderWork = _.partial( this.renderExp, DetailWorkView ),
				_renderProject = _.partial( this.renderExp, DetailProjectView );

			this.listenTo(
				this.options.expWork,
				'change:selected',
				_renderWork
			);

			this.listenTo(
				this.options.expProjects,
				'change:selected',
				_renderProject
			);

		},

		renderExp: function( View, model ) {

			// Reset all the models back to unselected.
			var detail = new View( {
				model: model
			} );
		}

	} );

	return DetailsView;

} );
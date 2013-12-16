define( function( require ) {

	var _ = require( 'underscore' ),
		BaseView = require( 'view/BaseView' ),
		DetailProjectView = require( 'view/Detail/ProjectView' ),
		DetailWorkView = require( 'view/Detail/WorkView' ),
		DetailTemplate = require( 'text!view/DetailTemplate.html' ),
		DetailsView;

	DetailsView = BaseView.extend( {

		/**
		 *
		 */
		html: undefined,

		/**
		 * @property	{String}	tagname
		 */
		tagname: 'div',

		/**
		 * @property	{String}	className
		 */
		className: 'detail-view',

		/**
		 * @property	{Object}	options
		 */
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

			this.html = this.template( DetailTemplate, {} );

			console.log( this.html );

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
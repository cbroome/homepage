define( function( require ) {

	var _ = require( 'underscore' ),
		BaseView = require( 'view/BaseView' ),
		DetailProjectView = require( 'view/Detail/ProjectView' ),
		DetailWorkView = require( 'view/Detail/WorkView' ),
		DetailsTemplate = require( 'text!view/DetailsTemplate.html' ),
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

			this.html = this.template( DetailsTemplate, {} );


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
		
		/**
		 *
		 * @returns {DetailsView}
		 */
		render: function() {
		
			this.$el.html( DetailsTemplate );
			
			return this;	
		},

		renderExp: function( View, model ) {
		
            var height = this.$el.height(),
                paddingTop = 0,
                detailHeight;
            
			this.render();
		
		
			// Reset all the models back to unselected.
			var detail = new View( {
				model: model
			} ).render();
            this.$el.empty().append( detail.$el );             
            detailHeight = detail.$el.height();
            
            if( detailHeight < height ) {
                paddingTop = parseInt( ( height - detailHeight ) / 2 ); 
            }
            
            console.log( 'marginTop: ', paddingTop );
            
            detail.$el.css( 'padding-top', paddingTop );
                        
			
			
		}

	} );

	return DetailsView;

} );
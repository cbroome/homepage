define( function( require ) {

	var _ = require( 'underscore' ),
		BaseView = require( 'view/BaseView' ),
		DetailProjectView = require( 'view/Detail/ProjectView' ),
		DetailWorkView = require( 'view/Detail/WorkView' ),
		DetailsTemplate = require( 'text!view/DetailsTemplate.html' ),
        ArrowView = require( 'view/ArrowView' ),
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

        /**
         * 
         * @param   {ExperienceView}    View
         * @param   {ExperienceModel}   model
         */
		renderExp: function( View, model ) {
		
            var height = this.$el.height(),
                paddingTop = 0,
                arrow,
                detailHeight;
            
			this.render();
		
		
			// Reset all the models back to unselected.
			var detail = new View( {
				model: model
			} ).render();
            this.$el.empty().append( detail.$el );             
            detailHeight = detail.$el.height();
            
            if( detailHeight < height ) {
                paddingTop = model.get( 'yPos' ) - 30;
                if( ( paddingTop + detailHeight ) > height ) {
                    paddingTop -= ( paddingTop + detailHeight ) - height + 25;
                }
            }

                        
            detail.$el.css( 'padding-top', paddingTop );
            
            
            // Draw the arrow.
            arrow = new ArrowView( { model: model } );
            arrow.render();
            
            this.$el.append( arrow.$el );
            
                        
			
			
		}

	} );

	return DetailsView;

} );
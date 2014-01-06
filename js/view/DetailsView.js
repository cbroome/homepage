define( function( require ) {

	var _ = require( 'underscore' ),
		BaseView = require( 'view/BaseView' ),
		DetailProjectView = require( 'view/Detail/ProjectView' ),
		DetailWorkView = require( 'view/Detail/WorkView' ),
        DetailSkillView = require( 'view/Detail/SkillView' ),
		DetailsTemplate = require( 'text!view/DetailsTemplate.html' ),
        ArrowView = require( 'view/ArrowView' ),
        SkillModel = require( 'model/SkillModel' ),
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
			expProjects: undefined,
            
            /**
             * @property    
             */
            skills: undefined

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
            
            this.listenTo( 
                this.options.skills,
                'change:selected',
                this.renderSkill
            );

		},
		
		/**
		 *
		 * @returns {DetailsView}
		 */
		render: function() {
		
			this.$el.empty().html( DetailsTemplate );
			
			return this;	
		},
        
        
        /**
         * 
         * @param   {SkillModel}    model
         */
        renderSkill: function( model  ) {
            
            var height = this.$el.height(),
                paddingTop = 0,
                detailHeight,
                detail;
            
			this.render();
            
            if( model.get( 'selected' ) ) {
                detail = new DetailSkillView( {
                    model: model
                } ).render();
                
                this.$el
                    .empty()
                    .append( detail.$el );
            
                detailHeight = detail.$el.height();
                
                if( detailHeight < height ) {
                    paddingTop = parseInt( ( height - detailHeight ) / 2 );
                }
                                
                detail.$el.css( 'padding-top', paddingTop );
            }
			          
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
                detailHeight,
                detail;
            
			this.render();
            
            if( model.get( 'selected' ) ) {
                detail = new View( {
                    model: model
                } ).render();
                
                this.$el
                    .empty()
                    .append( detail.$el );
            
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
			
		}

	} );

	return DetailsView;

} );
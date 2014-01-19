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

			var _renderWork = _.partial( this.renderSkill, DetailWorkView ),
				_renderProject = _.partial( this.renderSkill, DetailProjectView ),
                _renderSkill = _.partial( this.renderSkill, DetailSkillView) ;

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
                _renderSkill
            );

		},
		
		/**
		 *
		 * @returns {DetailsView}
		 */
		render: function() {
		
			this.$el.empty().html( DetailsTemplate ).css( 'margin-top', 235 );
			
			return this;	
		},
        
        
        /**
         * 
         * @param   {SkillModel}    model
         */
        renderSkill: function( View, model  ) {
            
            var height = this.$el.parent().height(),
                marginTop = 0,
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
            
                detailHeight = this.$el.height();
                
                if( detailHeight < height ) {
                    marginTop = parseInt( ( height - detailHeight ) / 2 );
                }
                                
                this.$el.css( 'margin-top', marginTop );
            }
			          
        }
        
	} );

	return DetailsView;

} );
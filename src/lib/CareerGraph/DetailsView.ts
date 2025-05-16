export class DetailsView {

		/**
		 *
		 */
		html: string;

		/**
		 * @property	{String}	tagname
		 */
		tagname: 'div';

		/**
		 * @property	{String}	className
		 */
		className: 'detail-view';

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

		};


		constructor() {

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
		
			this.$el.empty()
                .css( 'margin-top', 235 )
                .hide();
			
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
                    .append( detail.$el )
                    .show();
            
                detailHeight = this.$el.height();
                
                if( detailHeight < height ) {
                    marginTop = parseInt( ( height - detailHeight ) / 2 );
                }
                                
                this.$el.css( 'margin-top', marginTop );
            }
			          
        }
        
	}
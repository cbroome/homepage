define( function ( require ) {

		var $ = require( 'jquery' ),
			_ = require( 'underscore' ),
			Backbone = require( 'backbone' ),
			d3 = require( 'd3' ),
			SkillsTemplate = require( 'text!view/SkillsTemplate.html' ),
			BaseView = require( 'view/BaseView' ),
			EVENTS = require( 'events' ),
			SkillView = require( 'view/SkillView' ),
			SkillsView;

        SkillsView = BaseView.extend( {


			/**
			 * @property	{Marionette.Application}	app
			 */
			app: undefined,

			/**
			 * @property	{Backbone.Collection}	jobs
			 */
			jobs: undefined,

			/**
			 * @property	{Backbone.Collection}	projects
			 */
			projects: undefined,

			/**
			 * @property	{Array}	skills
			 */
			skills: undefined,

			/**
			 * @property	{d3}	svg
			 */
			svg: undefined,
            
            /**
             * @property    {d3}    group
             */
            group: undefined,
            
            /**
             * @property    {Integer}   startY
             */
            startY: 5,
            

			/**
			 * @property	{Integer}	cursorY
			 */
			cursorY: undefined,

			/**
			 * @property	{Integer}	heightLine
			 */
			heightLine: 13,
            
            /**
             * @property    {Integer}   heightHeader
             */
            heightHeader: 17,

			/**
			 * @property	{Integer}	x
			 */
			x: 900,
            
            /**
             * @property    {Integer}   xHeader
             */
            xHeader: 900,
            
            /**
             * @property    {Integer}   width       width of widest component, should be computed eventually
             */
            width: 124,
            
            /**
             * @property    {Integer}   xComputed
             */
            xComputed: undefined,
            
            
            /**
             * @property    {Array} sortOrder
             */
            sortOrder: undefined,
            
            /**
             * @property    {Integer}   startY
             */
            startY: 14,


			/**
			 *
			 */
            initialize: function( ) {

				var render = _.debounce( _.bind( this.render, this ), 100 );
				this.svg = d3.select( 'svg' );
                
                this.group = this.svg.append( 'g' )
                    .attr( 'class', 'group-skills' );

				this.app = require( 'app' );
				this.jobs = this.options.jobs;
				this.projects = this.options.projects;
				this.skills = [];
                
                
                this.sortOrder = {
                    'language': 'Languages',
                    'datastore': 'Datastores',
                    'version control': 'Version Control',
                    'framework': 'Frameworks',
                    'library': 'Libraries',
                    'utility': 'Utilities',
                    'misc': 'Miscellaneous'
                };


            },



			/**
			 * @chainable
			 * @returns	{view.Skills}
			 */
			render: function( windowWidth ) {
				var sortedSkills = {},
                    orderedKeys = _.keys( this.sortOrder ),
					getY = _.bind( this._getY, this, this.heightLine );
                
                
                
                this.xComputed = windowWidth - this.width;
                
                this.cursorY = this.startY;
                
                this.cursorY = this.startY;
				this.group.selectAll( 'text.skill-label' )
					.remove();

                _.each( 
                    orderedKeys,
                    function( type ) {
                        sortedSkills[ type ] = [];   
                    },
                    this
                );
                
                
                this.collection.each( function( skill ) {
                    var type = _.indexOf( orderedKeys, skill.get( 'type' ) ) >= 0 ? skill.get( 'type' ) : 'misc';
                    sortedSkills[ type ].push( skill ); 
                }, this );
                
            
				_.each(
					sortedSkills,
					function( section, key ) {
                        
                        this._createHeader( key );                         
                        _.each( 
                            section,
                            this._createSkill,
                            this
                        );
                        
                        this._getY( 10 );
					},
					this
				);

				return this;

			},
            
            
            /**
             * 
             * @param   {String}    title
             */
            _createHeader: function( title ) {
                 var x = this.xComputed,
                    y = this._getY( this.heightHeader ),
                    obj;

                obj = this.group.append( 'text' )
                    .text( this.sortOrder[ title ] )
                    .attr( 'class', 'skill-header' )
                    .attr( 'x', this.xComputed )
                    .attr( 'y', y );               
            },
            
            
            /**
             * 
             * @param   {SkillModel}    skill
             */
            _createSkill: function( skill ) {
                var x = this.xComputed,
                    y = this._getY( this.heightLine ),
                    obj;

                obj = this.group.append( 'text' )
                    .text( skill.get( 'id' ) )
                    .attr( 'class', 'skill-label' )
                    .attr( 'x', x )
                    .attr( 'y', y );

                skill.set( {
                    xPos:  x,
                    yPos: y
                } );

                this.skills.push(
                    new SkillView( {
                        svg: this.svg,
                        d3el: obj,
                        model: skill
                    } )
                );
            },

			/**
			 * @param	{Integer}	increment
			 * @returns	{Integer}
			 */
			_getY: function( increment ) {
                var rv = this.cursorY;
				this.cursorY += increment;
                return rv;
			}


        } );

        return SkillsView;
    }
);
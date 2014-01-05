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
			svg: d3,
            
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
			heightLine: 14,
            
            /**
             * @property    {Integer}   heightHeader
             */
            heightHeader: 18,

			/**
			 * @property	{Integer}	x
			 */
			x: 120,
            
            /**
             * @property    {Integer}   xHeader
             */
            xHeader: 120,
            
            
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
			render: function() {
				var sortedSkills = {},
                    orderedKeys = _.keys( this.sortOrder ),
					getY = _.bind( this._getY, this, this.heightLine );
                
                this.cursorY = this.startY;
                
                this.cursorY = this.startY;
				this.svg.selectAll( 'text.skill-label' )
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
                        //this._getY( 2 );
                        
                        _.each( 
                            section,
                            this._createSkill,
                            this
                        );
                        
                        this._getY( 12 );
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
                 var x = this.x,
                    y = this._getY( this.heightHeader ),
                    obj;

                obj = this.svg.append( 'text' )
                    .text( this.sortOrder[ title ] )
                    .attr( 'class', 'skill-header' )
                    .attr( 'text-anchor', 'end' )
                    .attr( 'x', this.xHeader )
                    .attr( 'y', y );               
            },
            
            
            /**
             * 
             * @param   {SkillModel}    skill
             */
            _createSkill: function( skill ) {
                var x = this.x,
                    y = this._getY( this.heightLine ),
                    obj;

                obj = this.svg.append( 'text' )
                    .text( skill.get( 'id' ) )
                    .attr( 'class', 'skill-label' )
                    .attr( 'text-anchor', 'end' )
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
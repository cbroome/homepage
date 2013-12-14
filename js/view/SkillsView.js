define( function ( require ) {

		var $ = require( 'jquery' ),
			_ = require( 'underscore' ),
			Backbone = require( 'backbone' ),
			d3 = require( 'd3' ),
			SkillsTemplate = require( 'text!view/SkillsTemplate.html' ),
			BaseView = require( 'view/BaseView' ),
			EVENTS = require( 'EVENTS' ),
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
			 * @property	{Integer}	cursorY
			 */
			cursorY: 20,

			/**
			 * @property	{Integer}	heightLine
			 */
			heightLine: 20,

			/**
			 * @property	{Integer}	x
			 */
			x: 100,


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


            },



			/**
			 * @chainable
			 * @returns	{view.Skills}
			 */
			render: function() {


				var sortedSkills,
					getY = _.bind( this._getY, this, this.heightLine );

				this.cursorY = 20;

				this.svg.selectAll( 'text.skill-label' )
					.remove();

				sortedSkills = this.collection.sortBy( 'count' ).reverse();

				_.each(
					sortedSkills,
					function( skill ) {

						var x = this.x,
							y = getY(),
							obj;

						obj = this.svg.append( 'text' )
							.text( skill.get( 'name' ) )
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
						)

					},
					this
				);

				return this;

			},

			/**
			 * @param	{Integer}	increment
			 * @returns	{Integer}
			 */
			_getY: function( increment ) {
				return this.cursorY += increment;
			}


        } );

        return SkillsView;
    }
);
define( function ( require ) {

		var $ = require( 'jquery' ),
			_ = require( 'underscore' ),
			Backbone = require( 'backbone' ),
			d3 = require( 'd3' ),
			SkillsTemplate = require( 'text!view/SkillsTemplate.html' ),
			BaseView = require( 'view/BaseView' ),
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
			 * @property	{Object}	skills
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
			heightLine: 22,


			/**
			 *
			 */
            initialize: function( ) {

				var render = _.debounce( _.bind( this.render, this ), 100 );
				this.svg = d3.select( 'svg' );

				this.app = require( 'app' );
				this.jobs = this.options.jobs;
				this.projects = this.options.projects;
				this.skills = {};

				this.listenTo(
					this,
					EVENTS.SKILL.RENDER,
					this.render
				);

				this.app.vent.on(
					EVENTS.EXPERIENCE.CLICK,
					this._selectSkills,
					this
				);

				this.app.vent.on(
					EVENTS.EXPERIENCE.HOVER,
					this._highlightSkills,
					this
				);

				this.app.vent.on(
					EVENTS.EXPERIENCE.HOVER_END,
					this._highlightOff,
					this
				);

				this.app.vent.on(
					EVENTS.SKILL.RESET,
					this.resetSkillList,
					this
				);

				this.app.vent.on(
					EVENTS.SKILL.RENDER,
					render,
					this
				);

            },


			/**
			 * Removes the selected class...
			 *
			 */
			resetSkillList: function() {

				this.$el.find( 'li' ).removeClass( 'selected' );

			},


			_highlightOff: function() {
				// console.log( 'removing highlighted', this.$el.find( '.highlighted' ) );

				this.$el.find( '.highlighted' )
					.removeClass( 'highlighted' );
			},


			/**
			 *
			 */
			_highlightSkills: function( skills )  {

				this._highlightOff();

				if ( skills ) {
					var skillIDs = _.map( skills, function( skill ) {
						return '#' + this._skillID( skill );
					}, this );
					this.$el.find( skillIDs.toString() ).addClass( 'highlighted' );
				}

			},


			/**
			 *
			 * @param	{Array}	skills
			 */
			_selectSkills: function( skills ) {

				this.resetSkillList();
				var skillIDs = _.each(
					skills,
					function( skill ){
						this.$el.find( '#' + this._skillID( skill ) ).addClass( 'selected' );
					},
					this
				);


			},



			/**
			 *
			 */
			_renderSkills: function() {
				var html, sortedSkills;

				// html...
				sortedSkills = _.sortBy( this.skills, 'count' ).reverse();
				html = this.template( SkillsTemplate, { skills: this.skills } );
				this.$el.empty().append( html );

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

						var x = 150,
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
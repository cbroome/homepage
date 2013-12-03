define(
    [
        'jquery',
		'underscore',
        'backbone',
		'd3',
		'text!view/SkillsTemplate.html',

        'view',
		'view/Base'

    ],
    function ( $, _, Backbone, d3, SkillsTemplate ) {


        view.Skills = view.Base.extend( {


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
			 *
			 */
            initialize: function( ) {

				var renderSVG = _.debounce( _.bind( this._renderSkillsSVG, this ), 100 );

				this.svg = d3.select( 'svg' );

				this.app = require( 'app' );
				this.jobs = this.options.jobs;
				this.projects = this.options.projects;
				this.skills = {};

				this.listenTo( this.jobs, 'reset', this._processExperience, this );
				this.listenTo( this.projects, 'reset', this._processExperience, this );

				this.listenTo(
					this,
					EVENTS.SKILL.RENDER,
					renderSVG
				);


				// Temporary
				this.listenTo(
					this,
					EVENTS.SKILL.RENDER,
					_.debounce( _.bind( this._renderSkills, this ), 100 )
				);
				//end


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
			 * @param	{String}	skill
			 * @returns	{String}
			 */
			_skillID: function( skill ) {
				var s = skill.toLowerCase().replace( /\s/g, '' );
				return 'skill-' + s.replace( /\./g, '_' );
			},


			/**
			 * Inserts the skill into this.skills or increments its count.
			 *
			 * @param	{String}	skill
			 */
			_processSkill: function( skill ) {
				if ( !( skill in this.skills ) ) {
					this.skills[ skill ] = {
						name: skill,
						htmlID: this._skillID( skill ),
						count: 1
					};
				}
				else {
					this.skills[ skill ][ 'count' ]++;
				}
			},



			/**
			 * @param	{model.Work.Experience}	experience
			 */
			_processExperience: function( experience ) {

				experience.each(
					function ( exp ) {
						var skills = exp.get( 'skills' );
						_.each( skills, this._processSkill, this );
					},
					this
				);
				this.trigger( EVENTS.SKILL.RENDER );
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


			_renderSkillsSVG: function() {
				var y = 20, height = 22,
					sortedSkills;

				sortedSkills = _.sortBy( this.skills, 'count' ).reverse();
				this.svg.selectAll( 'text.skill-label' )
					.remove()
					.data( sortedSkills )
					.enter( )
					.append( 'text' )
						.text( function( t ) { return t.name } )
						.attr( 'class', 'skill-label' )
						.attr( 'text-anchor', 'end' )
						.attr( 'x', 150 )
						.attr( 'y', function() { return y+=height; } );

			}


        } );

        return view.Skills;
    }
);
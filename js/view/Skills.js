define(
    [
        'jquery',
        'backbone',
        'handlebars',
		'text!view/SkillsTemplate.html',

        'view',
		'view/Base'

    ],
    function ( $, Backbone, Handlebars, SkillsTemplate ) {


        view.Skills = view.Base.extend( {


			/**
			 * @property	{Backbone.Collection}	jobs
			 */
			jobs: undefined,


			/**
			 * @property	{Backbone.Collection}	projects
			 */
			projects: undefined,


			/**
			 *
			 */
			skills: undefined,


			/**
			 *
			 */
            initialize: function( ) {

				this.jobs = this.options.jobs;
				this.projects = this.options.projects;

				this.listenTo( this.jobs, 'reset', this._processExperience );
				this.listenTo( this.projects, 'reset', this._processExperience );

				this.skills = {};
            },


			render: function() {},


			_processSkill: function( skill ) {
				if ( !( skill in this.skills ) ) {
					this.skills[ skill ] = {
						name: skill,
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

				this.skills = _.sortBy( this.skills, 'count' ).reverse();
				this._renderSkills();

			},


			/**
			 *
			 */
			_renderSkills: function() {



				var html;

				html = this.template( SkillsTemplate, { skills: this.skills } );

				$( this.el ).append( html );


			}


        } );

        return view;
    }
);
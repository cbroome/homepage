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

				this.listenTo( this.jobs, 'reset', this._processSkills );
				this.listenTo( this.projects, 'reset', this._processSkills );

				this.skills = {};
            },


			render: function() {

				console.log( 'Rendering!', this.el );

			},


			/**
			 * @param	{model.Work.Experience}	experience
			 */
			_processSkills: function( experience ) {

				_.each(
					experience.get( 'skills' ),
					function ( skill ) {
						if ( !( skill in this.skills ) ) {
							this.skills[ skill ] = 1;
						}
						else {
							this.skills[ skill ]++;
						}
					},
					this
				);

				this._renderSkills();

			},


			/**
			 *
			 */
			_renderSkills: function() {

				console.log( 'template: ', SkillsTemplate )
				// var html = this.template();



			}


        } );

        return view;
    }
);
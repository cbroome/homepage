define(
    [
        'jquery',
        'backbone',
        'underscore',
        'marionette',
		'app',

        'controller',

        'controller/BaseController',
		'model/SkillModel',
		'model/PathModel',
        'model/Experience/WorkModel',
		'model/Experience/ProjectModel',

		'view/SkillsView',
		'view/ExperienceList/WorkListView',
		'view/ExperienceList/ProjectListView',
		'view/PathView',

		'collection/Experience/ProjectCollection',
		'collection/Experience/WorkCollection',
		'collection/PathCollection',

		'view/ExperienceSVGView'

    ],
    function ( $, Backbone, _, Marionette, app, controller ) {


        controller.MainController = Marionette.Controller.extend( {

            /**
             * @property    {Backbone.Collection}	jobs
             */
            jobs: undefined,


			/**
			 * @property	{Backbone.Collection}	projects
			 */
			projects: undefined,


			/**
			 * @property	{Backbone.View}		skillView
			 */
			skillView: undefined,


			/**
			 * @property	{ExperienceListWorkListView}		workList
			 */
			workList: undefined,

			/**
			 * @property	{ExperienceListProjectListView}	projectList
			 */
			projectList: undefined,


			/**
			 * @property	{Backbone.Collection}	pathList
			 */
			pathList: undefined,


			/**
			 * @property	{Object}	skills
			 */
			skills: undefined,


			/**
			 * @property	{view.ExperienceSVG}	expSVG
			 */
			experienceSVG: undefined,


			/**
			 * @property	{Array}		experienceViews
			 */
			experienceViews: undefined,


            /**
             *
             */
            initialize: function() {

                var SkillCollection = Backbone.Collection.extend( {
						model: SkillModel
					} ),
					PathCollection = Backbone.Collection.extend( {
						model: PathModel
					} );

				this.skills = new SkillCollection();


				this.experienceViews = [];
				this.jobs = new ExperienceWorkCollection();
				this.projects = new ExperienceProjectCollection();


				this.skillView = new SkillsView( {
					jobs: this.jobs,
					projects: this.projects,
					collection: this.skills
				} );


				this.workList = new ExperienceListWorkListView( {
					collection: this.jobs
				} );

				this.projectList = new ExperienceListProjectListView( {
					collection: this.projects
				} );

				this.pathList = new PathCollection( [] );


				this.experienceSVG = new ExperienceSVGView( {
					expWork: this.jobs,
					expProjects: this.projects,
					experienceViews: this.experienceViews

				} );

				this.listenTo( this.jobs, 'sync', this._processJobs );
                this.buildLists();





				// @deprecated -- html stuff
				// app.skillList.show( this.skillView );
				// app.experienceWork.show( this.workList );
				// app.experienceProjects.show( this.projectList );
            },


			/**
			 * Retrieve data from the server.
			 *
			 */
            buildLists: function() {

				var params = {
					reset: true,
					success: _.bind( this._processExperience, this )
				};

                this.jobs.fetch( params );
				this.projects.fetch( params );
            },

			/**
			 *
			 */
			_buildLines: function() {

			},


			/**
			 * Get a safe-ish string represenation of the skill
			 *
			 * @property	{String}	skill
			 * @returns		{String}
			 */
			_skillID: function( skill ) {
				return skill.toLowerCase().trim();
			},

			/**
			 * Inserts the skill into this.skills or increments its count.
			 *
			 * @param	{String}	skill
			 */
			_processSkill: function( skill ) {
				var skillID = this._skillID( skill ),
					count = 1,
					rv;

				if ( !( this.skills.get( skillID ) ) ) {
					this.skills.add( {
						name: skill,
						id: skillID,
						count: count
					} );
				}
				else {
					count = this.skills.get( skillID ).get( 'count' );
					this.skills.get( skillID ).set( 'count', ++count );
				}
			},


			/**
			 * @param	{collection.ExperienceCollection}	experience
			 */
			_processExperience: function( experience ) {

				var app = require( 'app' );


				experience.each(
					_.bind( function ( exp ) {

						var skills = exp.get( 'skills' );

						_.each( skills, this._processSkill, this );


						_.each(
							skills,
							function( skill ) {
								this.pathList.add( {
									skill: this.skills.get( this._skillID( skill ) ),
									experience: exp
								} );
							},
							this
						);

					}, this )
				);

				app.vent.trigger( EVENTS.SKILL.RENDER );
			},


			_buildPaths: function() {

			}


        } );

        return controller.MainController;
    }
);
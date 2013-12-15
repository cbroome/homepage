define( function ( require ) {


		var $ = require( 'jquery' ),
			Backbone = require( 'backbone' ),
			_ = require( 'underscore' ),
			Marionette = require( 'marionette' ),
			SkillModel = require( 'model/SkillModel' ),
			PathModel = require( 'model/PathModel' ),
			WorkModel = require( 'model/Experience/WorkModel' ),
			ProjectModel = require( 'model/Experience/ProjectModel' ),

			SkillsView = require( 'view/SkillsView' ),
			ExperienceListWorkListView = require( 'view/ExperienceList/WorkListView' ),
			ExperienceListProjectListView = require( 'view/ExperienceList/ProjectListView' ),
			PathsView = require( 'view/PathsView' ),
			DetailsView = require( 'view/DetailsView' ),

			ExperienceProjectCollection = require( 'collection/Experience/ProjectCollection' ),
			ExperienceWorkCollection = require( 'collection/Experience/WorkCollection' ),
			PathCollection = require( 'collection/PathCollection' ),

			ExperienceSVGView = require( 'view/ExperienceSVGView' ),
			MainController;


        MainController = Marionette.Controller.extend( {

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
			 * @property	{DetailsViews}	detailsViews
			 */
			detailsViews: undefined,


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

/*
				this.workList = new ExperienceListWorkListView( {
					collection: this.jobs
				} );

				this.projectList = new ExperienceListProjectListView( {
					collection: this.projects
				} );
*/
				this.pathList = new PathCollection( [] );


				this.experienceSVG = new ExperienceSVGView( {
					expWork: this.jobs,
					expProjects: this.projects,
					experienceViews: this.experienceViews

				} );

				this.pathsView = new PathsView ( {
					collection: this.pathList
				} );

				this.detailsView = new DetailsView ( {
					expProjects: this.projects,
					expWork: this.jobs
				} );


				// Reset selected
				this.listenTo(
					this.projects,
					'change:selected',
					this._resetSelected
				);

				this.listenTo(
					this.jobs,
					'change:selected',
					this._resetSelected
				);



				this.buildLists();

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

				// app.vent.trigger( EVENTS.SKILL.RENDER );
				if( this.experienceSVG.render() && this.skillView.render() ) {
					// Give it time to draw everything
					_.delay( _.bind( this.pathsView.render, this.pathsView ), 100 );
				}
			},


			_buildPaths: function() {

			},


			/**
			 * @param	{ExperienceCollection}	collection
			 */
			_unselectCollection: function( collection ) {
				collection.each( function( model ) {
					model.set( { selected: false }, { silent: true } );
				} );
			},

			/**
			 * @param	{ExperienceModel}	model
			 */
			_resetSelected: function( model ) {
				var collections = [
					this.projects,
					this.jobs
				];
				_.each( collections, this._unselectCollection, this );
				model.set( { 'selected': true }, { silent: true } );
			}


        } );

        return MainController;
    }
);
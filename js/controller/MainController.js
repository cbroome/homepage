define(
    [
        'jquery',
        'backbone',
        'underscore',
        'marionette',

        'controller',

        'controller/BaseController',
        'model/Experience/Work',
		'model/Experience/Project',

		'view/Skills',
		'view/ExperienceList/WorkList',
		'view/ExperienceList/ProjectList'

    ],
    function ( $, Backbone, _, Marionette, controller ) {


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
			 * @property	{view.ExperienceList.WorkList}		workList
			 */
			workList: undefined,

			/**
			 * @property	{view.ExperienceList.ProjectList}	projectList
			 */
			projectList: undefined,


			skills: undefined,


            /**
             *
             */
            initialize: function() {

                var app = require( 'app' ),
					JobsCollection = Backbone.Collection.extend( {
                        model: model.Experience.Work,
                        url: './service/work.json'
                    } ),
					ProjectsCollection = Backbone.Collection.extend( {
						model: model.Experience.Project,
						url: './service/projects.json'
					} );

				this.skills = {};
                this.jobs = new JobsCollection();
				this.projects = new ProjectsCollection();

				this.skillView = new view.Skills( {
					jobs: this.jobs,
					projects: this.projects
				} );

				this.workList = new view.ExperienceList.WorkList( {
					collection: this.jobs
				} );

				this.projectList = new view.ExperienceList.ProjectList( {
					collection: this.projects
				} );

                this.listenTo( this.jobs, 'sync', this._processJobs );
                this.buildLists();


				app.skillList.show( this.skillView );
				app.experienceWork.show( this.workList );
				app.experienceProjects.show( this.projectList );
            },


			/**
			 * Retrieve data from the server.
			 *
			 */
            buildLists: function() {
                this.jobs.fetch( { reset: true } );
				this.projects.fetch( { reset: true } );
            }




        } );

        return controller.MainController;
    }
);
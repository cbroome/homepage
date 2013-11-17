define(
    [
        'jquery',
        'backbone',
        'underscore',
        'marionette',

        'controller',

        'controller/BaseController',
        'model/Experience/Work',

		'view/Skills',
		'view/WorkList'

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
			 * @property	{Backbone.View}		workList
			 */
			workList: undefined,


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
						model: model.Experience.Project
					} );

				this.skills = {};
                this.jobs = new JobsCollection();
				this.projects = new ProjectsCollection();

				this.skillView = new view.Skills( {
					jobs: this.jobs,
					projects: this.projects
				} );

				this.workList = new view.WorkList( {
					collection: this.jobs
				} );

                this.listenTo( this.jobs, 'sync', this._processJobs );
                this.buildLists();


				app.skillList.show( this.skillView );
				app.experienceWork.show( this.workList );
            },


			/**
			 * Retrieve data from the server.
			 *
			 */
            buildLists: function() {
                this.jobs.fetch( { reset: true } );
            }




        } );

        return controller.MainController;
    }
);
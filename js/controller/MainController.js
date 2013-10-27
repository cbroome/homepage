define(
    [
        'jquery',
        'backbone',
        'underscore',
        'marionette',

        'controller',

        'controller/BaseController',
        'model/Experience/Work'

    ],
    function ( $, Backbone, _, Marionette, controller ) {


        controller.MainController = Marionette.Controller.extend( {

            /**
             * @property    {Backbone.Collection}
             */
            jobs: undefined,


			skills: undefined,


            /**
             *
             */
            initialize: function() {

                var JobsCollection = Backbone.Collection.extend( {
                        model: model.Experience.Work,
                        url: './service/work.json'
                    } );

				this.skills = {};
                this.jobs = new JobsCollection();

                this.listenTo( this.jobs, 'sync', this._processJobs );
                this.buildLists();
            },


			/**
			 * Retrieve data from the server.
			 *
			 */
            buildLists: function() {
                this.jobs.fetch();
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

			},


            _processJobs: function() {

				this.jobs.each( this._processSkills,  this );

            }


        } );

        return controller.MainController;
    }
);
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
			PathsView = require( 'view/PathsView' ),
			DetailsView = require( 'view/DetailsView' ),

			ExperienceProjectCollection = require( 'collection/Experience/ProjectCollection' ),
			ExperienceWorkCollection = require( 'collection/Experience/WorkCollection' ),
			PathCollection = require( 'collection/PathCollection' ),
            SkillCollection = require( 'collection/SkillCollection' ),

			ExperienceSVGView = require( 'view/ExperienceSVGView' ),
            EVENTS = require( 'events' ),
			app,
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

                var PathCollection = Backbone.Collection.extend( {
						model: PathModel
					} );

				app = require( 'app' );	
				
				this.skills = new SkillCollection();


				this.experienceViews = [];
				this.jobs = new ExperienceWorkCollection();
				this.projects = new ExperienceProjectCollection();


				this.skillView = new SkillsView( {
					jobs: this.jobs,
					projects: this.projects,
					collection: this.skills
				} );

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
					expWork: this.jobs,
                    skills: this.skills
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
                
                this.listenTo( 
                    this.skills,
                    'change:selected',
                    this._resetSelected
                );
                
                app.vent.on( EVENTS.SKILL.HOVER_END, _.bind( this._hoverEnd, this ) );
                app.vent.on( EVENTS.EXPERIENCE.HOVER_END, _.bind( this._hoverEnd, this ) ); 

				this.buildLists();
                this.drawViews();
                
                
                $( window ).bind( 'resize.app', _.bind( this.drawViews, this ) );
                
				app.detailsView.show( this.detailsView );

            },


			/**
			 * Retrieve data from the server.
			 *
			 */
            buildLists: function() {

				var params = {
                        reset: true,
                        success: _.bind( this._processExperience, this )
                    },
                    exps = [ this.jobs, this.projects ],
                    colors = require( 'data/ColorsData' ),
                    colorIndex = 0;
                
                this.skills.add( require( 'data/SkillData' ) );
                
                this.jobs.add( require( 'data/WorkData' ) );
                this.projects.add( require( 'data/ProjectData' ) );
                
                _.each( 
                    exps,
                    function( exp ) {
                        exp.each( function( model ) {
                            model.set( { stroke: colors[ ( colorIndex++ % colors.length ) ] } );
                        } );
                    },
                    this
                );
                
                this._processExperience( this.jobs );
                this._processExperience( this.projects );
            },
            
            
            
            drawViews: function() {
                
                var windowWidth = $( window ).width();
                
                
                if( windowWidth > 2000 ) {
                    windowWidth = 2000;
                }
                else if( windowWidth > 1024 ) {
                    // for padding...
                    windowWidth -= 50;   
                }
                else if( windowWidth < 1024 ) {
                    windowWidth = 1024;   
                }
                
                
                $( '.main-display svg' )
                    .attr( 'width', windowWidth )
                    .find( 'g' ).empty();
                
                this.skillView.render( windowWidth  );
                this.experienceSVG.render( windowWidth );
                
                // Brief delay to render everything
                _.delay( _.bind( this.pathsView.render, this.pathsView ), 100 );                
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
			 * @param	{ExperienceCollection}	experience
			 */
			_processExperience: function( experience ) {

				var app = require( 'app' );
				experience.each(
					_.bind( function ( exp ) {						
						var skills = exp.get( 'skills' );
						var associateSkillAndExperience = _.bind( this._associateSkillAndExperience, this, exp );

						_.each(
							skills,
							associateSkillAndExperience,
							this
						);

					}, this )
				);
			},


			/**
			 * 
			 * @param {*} exp 
			 * @param {*} skill 
			 */
			_associateSkillAndExperience( exp, skill ) {
				var skillModel = this.skills.get( skill );
				if( !skillModel ) {
					throw new Error ('Could not find skill ' + skill);
				}
				this.pathList.add( {
					skill: skillModel,
					experience: exp
				} );				
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
                        this.jobs,
                        this.skills
                    ],
                    selected = model.get( 'selected' );

				_.each( collections, this._unselectCollection, this );
                model.set( { selected: selected }, { silent: true } );
                app.vent.trigger( EVENTS.PATHS.RESET ); 
			},
            
            
            /**
             *
             * @param   {ExperienceModel}   model
             */
            _hoverEnd: function( model ) {                
                var exps = [ this.jobs, this.projects, this.skills ]; 
                app.vent.trigger( EVENTS.PATHS.RESET ); 
                _.each(
                    exps,
                    this._reselectExperience,
                    this
                );
                
            },
            
            
            /**
             * @param   {Backbone.Collection}   collection
             */
            _reselectExperience: function( collection ) {
                var exp = collection.findWhere( { selected: true } );
                if( exp ) {
                    exp.trigger( EVENTS.EXPERIENCE.RESELECT );    
                }
            }

        } );

        return MainController;
    }
);
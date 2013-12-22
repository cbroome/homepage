define( function ( require ) {

		var $ = require( 'jquery' ),
			_ = require( 'underscore' ),
			Backbone = require( 'backbone' ),
			d3 = require( 'd3' ),
			BaseView = require( 'view/BaseView' ),
			ExperienceWorkView = require( 'view/Experience/WorkView' ),
			ExperienceWorkModel = require( 'model/Experience/WorkModel' ),
			ExperienceProjectView = require( 'view/Experience/ProjectView' ),
			ExperienceSVGView;

        ExperienceSVGView = BaseView.extend( {

			/**
			 * @property
			 */
			views: undefined,

			/**
			 * @property	{collection.Experience.WorkCollection}	expWork
			 */
			expWork: undefined,

			/**
			 * @property	{collection.Experience.ProjectCollection}	expProjects
			 */
			expProjects: undefined,

			/**
			 * @property	{d3}	svg
			 */
			svg: undefined,

			/**
			 * @property	{Integer}	cursorY		Keep track of current height
			 */
			cursorY: 10,

			/**
			 * @property	{Integer}	heightHeader
			 */
			heightHeader: 45,

			/**
			 * @property	{Integer}	heightLine
			 */
			heightLine: 45,

			/**
			 * @property	{Integer}	xRegular
			 */
			xHeader: 260,

			/**
			 * @property	{Integer}	xRegular
			 */
			xRegular: 285,

			/**
			 * @property	{Integer}	spacer
			 */
			spacer: 25,


			/**
			 * @property	{Object}	options
			 */
			options: {

				/**
				 * @property	{Array}		experienceViews
				 */
				experienceViews: undefined

			},


			initialize: function() {

				var render = _.debounce( _.bind( this.render, this ), 100 );

				this.svg = d3.select( 'svg#main-svg' );

				this.expWork = this.options.expWork;
				this.expProjects = this.options.expProjects;

				BaseView.prototype.initialize.apply( this );
			},



			/**
			 * @chainable
			 * @returns	{view.Work}
			 */
			render: function() {

				var jobs = [], html, $list;

				this.svg.selectAll( '.exp' )
					.remove();
				this.cursorY = 10;

				this
					._renderSection( this.expWork, 'Work Experience' )
					._renderSection( this.expProjects, 'Personal Projects' );



				return this;
			},


			/**
			 *
			 */
			_renderSection: function( collection, title ) {

				this._renderHeader( title )
					._renderExperience( collection );

				this._getY( this.spacer );

				return this;
			},


			/**
			 * @chainable
			 * @param	{String}	title
			 * @returns	{view.ExperienceSVG}
			 */
			_renderHeader: function ( title ) {

				var getY = this._getY( this.heightHeader );
				var obj = this.svg
					.append( 'text' )
						.text( title )
						.attr( 'class', 'header exp' )
						.attr( 'x', this.xHeader )
						.attr( 'y',  getY );

				return this;
			},

			/**
			 *
			 * @chainable
			 * @param	{Backbone.collection}
			 * @returns	{view.ExperienceSVG}
			 */
			_renderExperience: function( collection ) {

				var data = collection.getSorted(),
					getY = _.bind( this._getY, this, this.heightLine );

				_.each(
					data,

					function( exp ) {

						var x = this.xRegular,
							y = getY(),
							viewClass = ( exp instanceof  ExperienceWorkModel ) ? ExperienceWorkView : ExperienceProjectView,
							obj = this.svg.append( 'text' )
								.text( function(){ return exp.get( 'title' ); } )
								.attr( 'class', 'exp experience' )
								.attr( 'x', x )
								.attr( 'y', y );

						exp.set( {
							xPos: x,
							yPos: y
						})

						this.options.experienceViews.push(
							new viewClass( {
								d3el: obj,
								model: exp
							} )
						);
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

		return ExperienceSVGView;
	}
);
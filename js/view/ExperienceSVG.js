define(
    [
        'jquery',
		'underscore',
        'backbone',
		'd3',

        'view',
		'view/Base',
		'view/Experience/Work'

    ],
    function ( $, _, Backbone, d3 ) {


        view.ExperienceSVG = view.Base.extend( {


			/**
			 * @property	{Backbone.Collection}	expWork
			 */
			expWork: undefined,

			/**
			 * @property	{Backbone.Collection}	expProjects
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
			xHeader: 250,

			/**
			 * @property	{Integer}	xRegular
			 */
			xRegular: 275,

			/**
			 * @property	{Integer}	spacer
			 */
			spacer: 25,


			initialize: function() {

				var render = _.debounce( _.bind( this.render, this ), 100 );

				this.svg = d3.select( 'svg#main-svg' );

				this.expWork = this.options.expWork;
				this.expProjects = this.options.expProjects;


				this.listenTo(
					this.expWork,
					'reset',
					render
				);


				this.listenTo(
					this.expProjects,
					'reset',
					render
				);



				view.Base.prototype.initialize.apply( this );
			},



			/**
			 * @chainable
			 * @returns	{view.Work}
			 */
			render: function() {

				var jobs = [], html, $list;

				this.svg.selectAll( '.exp' )
					.remove();

				this
					._renderSection( this.expWork, 'Work Experience' )
					._renderSection( this.expProjects, 'Projects' );



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


				var obj = this.svg
					.selectAll(  )
					.data( data )
					.enter()
					.append( 'text' )
						.text( function( t ){ return t.get( 'title' ); } )
						.attr( 'class', 'exp experience' )
						.attr( 'x', this.xRegular )
						.attr( 'y',  getY );

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

		return view.ExperienceSVG;
	}
);
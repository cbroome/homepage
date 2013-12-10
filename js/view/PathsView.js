define( function ( require ) {


		var BaseView = require( 'view/BaseView' ),
			d3 = require( 'd3' ),
			PathView = require( 'view/PathView' ),
			PathsView;

        PathsView = BaseView.extend( {


			/**
			 * @property	{collection.PathCollection}	collection
			 */
			collection: undefined,

			/**
			 * @property	{Array}		paths
			 */
			paths: undefined,

			/**
			 * @property	{d3}		svg
			 */
			svg: undefined,



			initialize: function() {

				var app = require( 'app' );
				this.paths = [];
 				this.svg = d3.select( 'svg#main-svg' );

				app.vent.on( EVENTS.SKILL.RENDER, this.render, this );

			},


			/**
			 * @chainable
			 * @returns	{PathsView}
			 */
			render: function() {

				this.paths = [];

				var expY = 10,
					expX = 5,
					skillX = 5,
					skillY = 7;

				this.collection.each( function( path ) {
					// Simple lines for now...
					var skill = path.get( 'skill' ),
						line = this.svg.append( 'svg:line' )
							.attr( 'class', 'line' )
							.attr( 'x1', path.get( 'skill' ).get( 'xPos' ) + skillX)
							.attr( 'y1', path.get( 'skill' ).get( 'yPos' ) - skillY )
							.attr( 'x2', path.get( 'experience' ).get( 'xPos' ) - expX )
							.attr( 'y2', path.get( 'experience' ).get( 'yPos' ) - expY );


					this.paths.push( new PathView ( {
						model: path,
						line: line
					} ) );

				}, this );


				return this;
			}


        } );

        return PathsView;
    }
);
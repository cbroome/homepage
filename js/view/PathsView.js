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

				this.collection.each( function( path ) {
					// Simple lines for now...
					var skill = path.get( 'skill' ),
						line = this.svg.append( 'svg:line' )
							.attr( 'x1', path.get( 'skill' ).get( 'x' ) )
							.attr( 'y1', path.get( 'skill' ).get( 'y' ) )
							.attr( 'x2', path.get( 'experience' ).x )
							.attr( 'y2', path.get( 'experience' ).y )
							.attr( 'style', 'stroke:rgb(255,0,0);stroke-width:2' );


					this.paths.push( new PathView ( {
						model: path,
						line: line
					} ) );

					console.log( 'skill xPos: ', skill.attributes.xPos );

				}, this );


				return this;
			}


        } );

        return PathsView;
    }
);
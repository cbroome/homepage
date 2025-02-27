define( function ( require ) {


		var _ = require( 'underscore' ),
            BaseView = require( 'view/BaseView' ),
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
            
            /**
             * @property    {d3}        group
             */
            group: undefined,



			initialize: function() {

				var app = require( 'app' );
				this.paths = [];
 				this.svg = d3.select( 'svg#main-svg' );
                    
                this.group = this.svg.append( 'g' )
                    .attr( 'class', 'group-paths' );

			},


			/**
			 * @chainable
			 * @returns	{PathsView}
			 */
			render: function() {

                if( this.paths ) {
                    _.each( 
                        this.paths,
                        function( path ) {
                            path.remove();    
                        },
                        this
                    );
                }
                
				this.paths = [];

				var expY = 5,
					expX = 10,
					skillX = 5,
					skillY = 4,
					lineFunction,
					findDiff;

				findDiff = function( start, end ) {
					return ( end > start ?  start + ( end - start ) / 2  : end + ( start - end ) / 2 );
				};

				lineFunction = d3.svg.line()
					.x( function ( d ) { return d.x; } )
					.y( function ( d ) { return d.y; } )
					.interpolate( 'basis' );



				this.collection.each( function( path ) {
					// Simple lines for now...
					var	skill = path.get( 'skill' ),
						experience = path.get( 'experience' ),
						startX = experience.get( 'xPos' ) + expX,
						startY = experience.get( 'yPos' ) - expY,
						endX = skill.get( 'xPos' ) - skillX,
						endY = skill.get( 'yPos' ) - skillY,

						midX = endX - startX,
						midY = findDiff( endY, startY ),


						lineData = [

							{ x: startX, y: startY },

							{ x: startX + 85, y: startY },

							{ x: midX, y: midY },

							{ x: endX - 75, y: endY },

							{ x: endX, y: endY }
						],

						line;


					line = this.group.append( 'path' )
						.attr( 'd', lineFunction( lineData ) )
                        .attr( 'stroke', experience.get( 'stroke' ) )
						.attr( 'class', 'line' );


					this.paths.push( new PathView ( {
						svg: this.svg,
                        group: this.group,
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
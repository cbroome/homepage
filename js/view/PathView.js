define( function ( require ) {


		var BaseView = require( 'view/BaseView' ),
            d3 = require( 'd3' ),
            _ = require( 'underscore' ),
			PathModel = require( 'model/PathModel' ),
			EVENTS = require( 'events' ),
            app,
			PathView;

        PathView = BaseView.extend( {


			/**
			 * @property	{PathModel}
			 */
			model: undefined,

			/**
			 * @property	{Object}	options
			 */
			options: {

				/**
				 * @property	{d3}	line
				 */
				line: undefined,

				/**
				 * @property	{d3}	svg
				 */
				svg: undefined

			},


			initialize: function() {

                app = require( 'app' );
                
				this.listenTo(
					this.model.get( 'experience' ),
					EVENTS.EXPERIENCE.HOVER,
					this._hoverOn
				);

				this.listenTo(
					this.model.get( 'skill' ),
					EVENTS.SKILL.HOVER,
					this._hoverOn
				);

				this.listenTo(
					this.model.get( 'experience' ),
					EVENTS.EXPERIENCE.HOVER_END,
					this._hoverOff
				);

				this.listenTo(
					this.model.get( 'skill' ),
					EVENTS.SKILL.HOVER_END,
					this._hoverOff
				);
                
                app.vent.on( 
                    EVENTS.PATHS.RESET,
                    _.bind( this._hoverOff, this )
                );

			},

			/**
			 *
			 */
			_hoverOn: function() {
				this.options.line.classed( 'hovered', true );
                
                this.options.line.attr( 'stroke', this.model.get( 'experience' ).get( 'stroke' ) );
				$( this.options.line[ 0 ] ).detach();
				$( this.options.svg[ 0 ] ).append( this.options.line[ 0 ] );

			},


			_hoverOff: function() {
                if( !this.model.get( 'experience' ).get( 'selected' ) )  {
				    this.options.line.classed( 'hovered', false );
                }
			}


        } );

        return PathView;
    }
);
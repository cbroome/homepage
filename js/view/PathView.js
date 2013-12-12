define( function ( require ) {


		var BaseView = require( 'view/BaseView' ),
			PathModel = require( 'model/PathModel' ),
			EVENTS = require( 'events' ),
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

				this.listenTo(
					this.model.get( 'experience' ),
					EVENTS.EXPERIENCE.HOVER,
					this._experienceHoverOn
				);

				this.listenTo(
					this.model.get( 'experience' ),
					EVENTS.EXPERIENCE.HOVER_END,
					this._experienceHoverOff
				);

			},

			/**
			 *
			 */
			_experienceHoverOn: function() {
				this.options.line.classed( 'hovered', true );

				$( this.options.line[ 0 ] ).detach();

				$( this.options.svg[ 0 ] ).append( this.options.line[ 0 ] );

			},


			_experienceHoverOff: function() {

				this.options.line.classed( 'hovered', false);

			}


        } );

        return PathView;
    }
);
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
				line: undefined

			},


			initialize: function() {

				this.listenTo(
					this.model,
					EVENTS.EXPERIENCE.HOVER,
					this._experienceHover
				);

			},

			/**
			 *
			 */
			_experienceHover: function() {

				console.log( this.options.line );

			}


        } );

        return PathView;
    }
);
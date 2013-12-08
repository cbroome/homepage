define( function ( require ) {


		var BaseView = require( 'view/BaseView' ),
			PathView;

        PathView = BaseView.extend( {

			/**
			 * @property
			 */
			skill: undefined,

			/**
			 * @property
			 */
			experience: undefined,


			initialize: function() {



			}


        } );

        return PathView;
    }
);
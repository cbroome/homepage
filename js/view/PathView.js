define( function ( require ) {


		var BaseView = require( 'view/BaseView' ),
			PathView;

        PathView = BaseView.extend( {


			/**
			 * @property	{model/PathModel}
			 */
			model: undefined,




			initialize: function() { }


        } );

        return PathView;
    }
);
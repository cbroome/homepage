define( function( require ) {

		var Backbone = require( 'backbone' ),
			PathModel = require( 'model/PathModel' ),
			PathCollection;

		PathCollection = Backbone.Collection.extend( {

			/**
			 * @property	{model.Path}	model
			 */
			model: PathModel

		} );

		return PathCollection;

	}
);
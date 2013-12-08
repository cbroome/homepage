define(
	[
		'backbone',
		'collection',

		'model/PathModel'
	],
	function( Backbone, collection ) {


		collection.PathCollection = Backbone.Collection.extend( {

			/**
			 * @property	{model.Path}	model
			 */
			model: PathModel

		} );

		return collection.PathCollection;

	}
);
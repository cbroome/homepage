define(
	[
		'backbone',
		'collection',

		'model/Path'
	],
	function( Backbone, collection ) {


		collection.PathCollection = Backbone.Collection.extend( {

			/**
			 * @property	{model.Path}	model
			 */
			model: model.Path

		} );

		return collection.PathCollection;

	}
);
define( function( require ) {

	var BaseView = require( 'view/BaseView' ),
		DetailView;

	DetailView = BaseView.extend( {


		/**
		 * @property	{String}	template
		 */
		template: undefined,


		initialize: function() {
			console.log( "in detail view" );
		},

		/**
		 *
		 */
		render: function() {

			

			return this;
		}

	} );

	return DetailView;

} );
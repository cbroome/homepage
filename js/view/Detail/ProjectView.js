define( function( require) {

	var DetailView = require( 'view/DetailView' ),
		template = requrie( 'text!view/Detail/ProjectView' ),
		DetailProjectView;

	DetailProjectView = DetailView.extend( {


		initialize: function () {
			this.template = template;
		}

	} );

	return DetailProjectView;

} );
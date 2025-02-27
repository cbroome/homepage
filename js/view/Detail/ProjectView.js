define( function( require) {

	var DetailView = require( 'view/DetailView' ),
		template = require( 'text!view/Detail/ProjectTemplate.html' ),
		DetailProjectView;

	DetailProjectView = DetailView.extend( {


		initialize: function () {
			this.html = template;            
		}

	} );

	return DetailProjectView;

} );
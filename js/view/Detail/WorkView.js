define( function( require) {

	var DetailView = require( 'view/DetailView' ),
		template = require( 'text!view/Detail/WorkTemplate.html' ),
		DetailWorkView;

    
	DetailWorkView = DetailView.extend( {

		initialize: function() {
            this.html = template;
		}


	} );

	return DetailWorkView;

} );
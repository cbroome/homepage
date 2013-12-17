define( function( require ) {

	var BaseView = require( 'view/BaseView' ),
		DetailView;

	DetailView = BaseView.extend( {


		/**
		 * @property	{String}	template
		 */
		html: undefined,

		
		/**
		 * @property	{String}	className
		 */
		className: 'experience-detail',
		
		
		/**
		 * @property	{String}	tagName
		 */
		tagName: 'div',
		

		/**
		 *
		 */
		render: function() {

			
			console.log( 'dv: rendering,', this.html );
			return this;
		}

	} );

	return DetailView;

} );
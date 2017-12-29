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

			this.$el.html( this.template( this.html, this.model.attributes ) ); 
			return this;
		}

	} );

	return DetailView;

} );
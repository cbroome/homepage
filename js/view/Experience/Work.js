define(
    [
        'jquery',
        'backbone',
		'text!view/Experience/WorkTemplate.html',

        'view',
		'view/Base',
		'view/Experience'

    ],
    function ( $, Backbone, WorkTemplate ) {


        view.Experience.Work = view.Experience.extend( {


			/**
			 * @property	{model.Experience.Work}	model
			 */
			model: undefined,


			/**
			 * @chainable
			 * @returns	{view.Work}
			 */
			render: function() {
				var $html = $( this.template( WorkTemplate, this.model.attributes ) );
				this.$el.append( $html );
				this.setElement( $html );
				return this;
			}



		} );

		return view.Experience.Work;
	}
);
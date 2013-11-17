define(
    [
        'jquery',
        'backbone',
		'text!view/Experience/ProjectTemplate.html',

        'view',
		'view/Base',
		'view/Experience'

    ],
    function ( $, Backbone, ProjectTemplate ) {


        view.Experience.Project = view.Experience.extend( {


			/**
			 * @property	{model.Experience.Work}	model
			 */
			model: undefined,


			/**
			 * @chainable
			 * @returns	{view.Experience.Project}
			 */
			render: function() {
				var $html = $( this.template( ProjectTemplate, this.model.attributes ) );
				this.$el.append( $html );
				this.setElement( $html );
				return this;
			}



		} );

		return view.Experience.Project;
	}
);
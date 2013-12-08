define(
    [
        'jquery',
        'backbone',
		'text!view/Experience/ProjectTemplate.html',

        'view',
		'view/ExperienceView'

    ],
    function ( $, Backbone, ProjectTemplate ) {


        ExperienceProjectView = ExperienceView.extend( {


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

		return ExperienceProjectView;
	}
);
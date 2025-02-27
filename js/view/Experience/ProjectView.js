define(  function ( require ) {

		var $ = require( 'jquery' ),
			Backbone = require( 'backbone' ),
			ProjectTemplate = require( 'text!view/Experience/ProjectTemplate.html' ),
			ExperienceView = require( 'view/ExperienceView' ),
			ExperienceProjectView;

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
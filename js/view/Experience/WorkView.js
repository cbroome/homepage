define(  function ( require ) {

		var $ = require( 'jquery' ),
			Backbone = require( 'backbone' ),
			WorkTemplate = require( 'text!view/Experience/WorkTemplate.html' ),
			ExperienceView	= require( 'view/ExperienceView' ),
			ExperienceWorkView;

        ExperienceWorkView = ExperienceView.extend( {


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

		return ExperienceWorkView;
	}
);
define( function ( require ) {

		var	EVENTS = require( 'events' ),
            SelectableView = require( 'view/SelectableView' ),
			SkillView;



		SkillView = SelectableView.extend( {


			/**
			 * @property	{Marionette.Application}	app
			 */
			app: undefined,

			/**
			 * @property	{model.Experience}	model
			 */
			model: undefined,

			/**
			 * @property	{Boolean}	highlighted
			 */
			highlighted: undefined,

			/**
			 * @property	{d3}		d3el
			 */
			d3el: undefined,


			onMouseover: function() {
				this.model.trigger(
					EVENTS.SKILL.HOVER
				);
			},


			onMouseout: function() {
				this.model.trigger(
					EVENTS.SKILL.HOVER_END
				);
                this.app.vent.trigger( EVENTS.SKILL.HOVER_END, this.model );
			}

		} );

		return SkillView;
	}
);
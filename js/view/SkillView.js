define( function ( requrie ) {

		var	$ = require( 'jquery' ),
			Backbone = require( 'backbone' ),
			_ = require( 'underscore'),
			d3 = require( 'd3' ),
			EVENTS = require( 'events' ),
			BaseView = require( 'view/BaseView' ),
			SkillView;



		SkillView = BaseView.extend( {


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


			/**
			 *
			 */
			initialize: function() {

				this.highlighted = false;

				if ( 'd3el' in this.options ) {
					this.d3el = this.options.d3el;
					this.d3el.on( 'mouseover', _.bind( this.onMouseover, this ) );
					this.d3el.on( 'mouseout', _.bind( this.onMouseout, this ) );
				}

			},


			/**
			 *
			 * @event	{EVENTS.EXPERIENCE.SELECTED}
			 */
			onNameClick: function() {
				this.app.vent.trigger( EVENTS.EXPERIENCE.SELECTED, this.model );
			},


			onMouseover: function() {
				this.model.trigger(
					EVENTS.SKILL.HOVER
				);

			},


			onMouseout: function() {

				this.model.trigger(
					EVENTS.SKILL.HOVER_END
				);
			}

		} );

		return SkillView;
	}
);
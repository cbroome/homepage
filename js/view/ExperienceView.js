define( function ( requrie ) {

		var	$ = require( 'jquery' ),
			Backbone = require( 'backbone' ),
			_ = require( 'underscore'),
			d3 = require( 'd3' ),
			EVENTS = require( 'events' ),
			BaseView = require( 'view/BaseView' ),
			ExperienceView;



		ExperienceView = BaseView.extend( {


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
			 * @param {model.Experience}	model
			 */
			_experienceSelected: function( model ) {

				this.$el.removeClass( 'selected' );
				if ( this.model.cid === model.cid ) {

					if ( this.highlighted ) {
						this.app.vent.trigger( EVENTS.SKILL.RESET );
					}
					else {
						this.app.vent.trigger(
							EVENTS.EXPERIENCE.CLICK,
							this.model.get( 'skills' )
						);
						this.$el.addClass( 'selected' );

					}
					this.highlighted = !this.highlighted;
				}
				else {
					this.highlighted = false;
				}

			},


			/**
			 *
			 */
			initialize: function() {

				this.app = require( 'app' );
				this.highlighted = false;

				if ( 'd3el' in this.options ) {
					this.d3el = this.options.d3el;

					this.d3el.on( 'mouseover', _.bind( this.onMouseover, this ) );
					this.d3el.on( 'mouseout', _.bind( this.onMouseout, this ) );
					this.d3el.on( 'click', _.bind( this.onNameClick, this ) );

				}

				this.app.vent.on(
					EVENTS.EXPERIENCE.SELECTED,
					this._experienceSelected,
					this
				);
			},


			/**
			 *
			 * @event	{EVENTS.EXPERIENCE.SELECTED}
			 */
			onNameClick: function() {
				this.model.set( 'selected', true );
			},


			onMouseover: function() {
				this.model.trigger(
					EVENTS.EXPERIENCE.HOVER
				);

			},


			onMouseout: function() {

				this.model.trigger(
					EVENTS.EXPERIENCE.HOVER_END
				);
			}

		} );

		return ExperienceView;
	}
);
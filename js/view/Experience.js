define(
    [
        'jquery',
        'backbone',
        'view',
		'view/Base',
		'events'

    ],
    function ( $, Backbone ) {

        view.Experience = view.Base.extend( {


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
			 * @property	{Object}	events
			 */
			events: {
				'click .name': 'onNameClick',
				'mouseover': 'onMouseover',
				'mouseout': 'onMouseout'
			},


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


			initialize: function() {

				this.app = require( 'app' );
				this.highlighted = false;

				this.app.vent.on(
					EVENTS.EXPERIENCE.SELECTED,
					this._experienceSelected,
					this
				);

				view.Base.prototype.initialize.apply( this );

			},


			/**
			 *
			 * @event	{EVENTS.EXPERIENCE.SELECTED}
			 */
			onNameClick: function() {

				this.app.vent.trigger( EVENTS.EXPERIENCE.SELECTED, this.model );
			},


			onMouseover: function() {

				this.app.vent.trigger(
					EVENTS.EXPERIENCE.HOVER,
					this.model.get( 'skills' )
				);
			},


			onMouseout: function() {

				this.app.vent.trigger(
					EVENTS.EXPERIENCE.HOVER_END
				);
			}

		} );

		return view.Experience.Work;
	}
);
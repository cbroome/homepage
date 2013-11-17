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
				'mouseover': 'onMouseover'
			},


			initialize: function() {

				this.app = require( 'app' );
				this.highlighted = false;
				view.Base.prototype.initialize.apply( this );

			},


			onNameClick: function() {
				if ( this.highlighted ) {
					this.app.vent.trigger( EVENTS.SKILL.RESET );
				}
				else {
					this.app.vent.trigger(
						EVENTS.EXPERIENCE.CLICK,
						this.model.get( 'skills' )
					);
				}

				this.highlighted = !this.highlighted;

			},


			onMouseover: function() {

				this.app.vent.trigger(
					EVENTS.EXPERIENCE.HOVER,
					this.model.get( 'skills' )
				);
			}

		} );

		return view.Experience.Work;
	}
);
define(
    [ ],
    function ( $, Backbone ) {

        EVENTS = {

			SKILL: {

				HOVER: 'skillHover',

				CLICK: 'skillClick',

				RESET: 'skillReset'
			},

			EXPERIENCE: {

				HOVER: 'experieceHover',

				CLICK: 'experienceClick',

				SELECTED: 'experienceSelected'

			}

		};

		return EVENTS;
	}
);
define(
    [ ],
    function ( $, Backbone ) {

        EVENTS = {

			SKILL: {

				HOVER: 'skillHover',

				CLICK: 'skillClick',

				RESET: 'skillReset',

				RENDER: 'skillRender'
				
			},

			EXPERIENCE: {

				HOVER: 'experienceHover',

				HOVER_END: 'experienceHoverEnd',

				CLICK: 'experienceClick',

				SELECTED: 'experienceSelected'

			}

		};

		return EVENTS;
	}
);
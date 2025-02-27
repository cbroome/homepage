define(
    [ ],
    function ( $, Backbone ) {

        var EVENTS = {

			SKILL: {

				HOVER: 'skillHover',

				HOVER_END: 'skillHoverEnd',

				CLICK: 'skillClick',

				RESET: 'skillReset',

				RENDER: 'skillRender'

			},

			EXPERIENCE: {

				HOVER: 'experienceHover',

				HOVER_END: 'experienceHoverEnd',

				CLICK: 'experienceClick',

				SELECTED: 'experienceSelected',
                
                RESELECT: 'experienceReselect'

			},
            
            PATHS: {
                RESET: 'pathsReset'   
            }
		};

		return EVENTS;
	}
);
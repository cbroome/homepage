define(
    [
        'jquery',
		'underscore',
        'backbone',
		'd3',

        'view',
		'view/Base'

    ],
    function ( $, _, Backbone, d3 ) {


        view.Path = view.Base.extend( {

			/**
			 * @property
			 */
			skill: undefined,

			/**
			 * @property
			 */
			experience: undefined,


			initialize: function() {



			}


        } );

        return view.Path;
    }
);
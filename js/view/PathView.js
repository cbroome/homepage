define(
    [
        'jquery',
		'underscore',
        'backbone',
		'd3',

        'view',
		'view/BaseView'

    ],
    function ( $, _, Backbone, d3 ) {


        PathView = BaseView.extend( {

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

        return PathView;
    }
);
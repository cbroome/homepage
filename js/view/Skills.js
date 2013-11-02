define(
    [
        'jquery',
        'backbone',
        'handlebars',

        'view',
		'view/Base'

    ],
    function ( $, Backbone, Handlebars ) {


        view.Skills = view.Base.extend( {



            initialize: function( ) {

              console.log( 'initializing ', this.options );

            }



        } );

        return view;
    }
);
define(
    [
        'jquery',
        'backbone',
        'handlebars',

        'view'

    ],
    function ( $, Backbone, Handlebars ) {


        BaseView = Backbone.View.extend( {

            /**
             * @property    {Object}    options
             */
            options: undefined,

            /**
             * Backbone no longer sets options on views...
             *
             * @constructor
             * @param   {Object}    options
             */
            constructor: function( options ) {
                this.options = options || {};
                Backbone.View.apply(this, arguments);
            },

            /**
             *
             * @param   {String}    html
             * @param   {Object}    options
             * @returns {String}
             */
            template: function( html, options ) {
                var template = Handlebars.compile( html );
                return template( options );

            }


        } );

        return BaseView;
    }
);
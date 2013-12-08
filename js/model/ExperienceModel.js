define(  function ( require ) {

        var Backbone = require( 'backbone' ),
			ExperienceModel = Backbone.Model.extend( {

            /**
             * @property    {String}    title   human readable title
             */
            title: undefined,


            /**
             * @property    {String}    description
             */
            description: undefined,


            /**
             * @property    {Array}     skills
             */
            skills: undefined



        } );

        return ExperienceModel;
    }
);
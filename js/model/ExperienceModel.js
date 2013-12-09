define(  function ( require ) {

        var PositionModel = require( 'model/PositionModel' ),
			ExperienceModel;

		ExperienceModel = PositionModel.extend( {

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
            skills: undefined,




        } );

        return ExperienceModel;
    }
);
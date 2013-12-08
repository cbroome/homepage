define( function ( require ) {

		var Backbone = require( 'backbone' ),
			ExperienceModel = require( 'model/ExperienceModel' ),
			ExperienceWorkModel;


        ExperienceWorkModel = ExperienceModel.extend( {

            /**
             * @property    {Datetime}  dateStart
             */
            dateStart: undefined,

            /**
             * @property    {Datetime}  dateEnd
             */
            dateEnd: undefined,

            /**
             * @property    {String}    urlRoot
             */
            urlRoot: 'service/work'


        } );

        return ExperienceWorkModel;
    }
);
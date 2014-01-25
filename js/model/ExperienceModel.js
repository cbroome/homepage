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

			/**
			 * @property	{Boolean}	options
			 */
			options: {

				/**
				 * @property	{Boolean}	selected
				 */
				selected: undefined,
                
                /**
                 * @property    {String}    stroke      hex color...
                 */
                stroke: undefined

			},


			initialize: function() {
				this.set( { selected: false }, { silent: true } );
			}




        } );

        return ExperienceModel;
    }
);
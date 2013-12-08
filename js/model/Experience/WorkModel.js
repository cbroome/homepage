define(
    [
        'backbone',
        'model',

        'model/ExperienceModel'
    ],
    function (Backbone, model ) {

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
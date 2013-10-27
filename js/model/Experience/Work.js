define(
    [
        'backbone',
        'model',

        'model/Experience'
    ],
    function (Backbone, model ) {

        model.Experience.Work = model.Experience.extend( {

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

        return model.Experience.Work;
    }
);
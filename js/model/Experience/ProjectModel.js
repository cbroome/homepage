define(
    [
        'backbone',
        'model',

        'model/ExperienceModel'
    ],
    function (Backbone, model ) {

        /**
         * Represents a standalone web site or application
         *
         */

       ExperienceProjectModel = ExperienceModel.extend( {

            /**
             * @property    {String}    urlRoot
             */
            urlRoot: 'service/projects'
        } );

        return ExperienceProjectModel;
    }
);
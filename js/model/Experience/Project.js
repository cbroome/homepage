define(
    [
        'backbone',
        'model',

        'model/Experience'
    ],
    function (Backbone, model ) {

        /**
         * Represents a standalone web site or application
         *
         */

        model.Experience.Project = model.Experience.extend( {

            /**
             * @property    {String}    urlRoot
             */
            urlRoot: 'service/projects'
        } );

        return model.Experience.Project;
    }
);
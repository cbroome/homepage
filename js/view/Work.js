define(
    [
        'jquery',
        'backbone',
		'text!view/WorkTemplate.html',

        'view',
		'view/Base'

    ],
    function ( $, Backbone, WorkTemplate ) {


        view.Work = view.Base.extend( {


			initialize: function() {

				this.listenTo( this.collection, 'reset', this.render );

			},


			/**
			 * @chainable
			 * @returns	{view.Work}
			 */
			render: function() {

				var jobs = [], html;

				this.collection.each( function( job ) {
					jobs.push( job.attributes );
				} );

				jobs = _.sortBy( jobs, function( job ) {
					return ( -1 * parseInt( job.dates.start ) );
				} );

				html = this.template( WorkTemplate, { jobs: jobs } );

				$( this.el ).empty().append( html );

				return this;
			}

		} );

		return view.Work;
	}
);
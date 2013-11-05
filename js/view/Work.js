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
			 *
			 */
			render: function() {

				var jobs = [], html;

				this.collection.each( function( job ) {
					jobs.push( job.attributes );
				} );

				html = this.template( WorkTemplate, { jobs: jobs } );

				$( this.el ).empty().append( html );

				return this;
			}

		} );

		return view.Work;
	}
);
define(
    [
        'jquery',
        'backbone',
		'text!view/WorkListTemplate.html',

        'view',
		'view/Base',
		'view/Experience/Work'

    ],
    function ( $, Backbone, WorkListTemplate ) {


        view.WorkList = view.Base.extend( {


			initialize: function() {

				this.listenTo( this.collection, 'reset', this.render );

			},


			/**
			 * @chainable
			 * @returns	{view.Work}
			 */
			render: function() {

				var jobs = [], html, $list, sortedJobs;

				html = this.template( WorkListTemplate, {} );

				sortedJobs = this.collection.sortBy( function( job ) {
					return ( -1 * parseInt( job.get( 'dates' ).start ) );
				} );

				$( this.el ).empty().append( html );

				$list = this.$el.find( 'ul.jobs-list' );
				_.each(
					sortedJobs,
					function( job ) {
						// jobs.push( job.attributes );
						var work = new view.Experience.Work( {
							model: job,
							el: $list
						} );
						work.render();
					},
					this
				);



				return this;
			}

		} );

		return view.WorkList;
	}
);
define( function( require ) {

		var Backbone = require( 'backbone' ),
			SkillModel = require( 'model/SkillModel' ),
			ExperienceProjectModel = require( 'model/Experience/ProjectModel' ),
			SkillCollection;


		SkillCollection = Backbone.Collection.extend( {

			/**
			 * @property	{SkillModel}	model
			 */
			model: SkillModel,

			/**
			 * @property	{String}	url
			 */
			url: './service/skills.json',

            
			/**
			 * Return the values in custom sorted order.
			 *
			 * @returns		{Array}
			 */
			getSorted: function() {
				return this.sortBy( function( project ) {
					return ( project.get( 'status' ) === 'active' ) ? 0 : 1;
				} );
			}

		} );

		return SkillCollection;

	}
);
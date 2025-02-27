define(  function ( require ) {

        var Backbone = require( 'backbone' ),
			PositionModel;


		PositionModel = Backbone.Model.extend( {


			/**
			 * @property	{Integer}	x
			 */
			x: undefined,

			/**
			 * @property	{Integer}	y
			 */
			y: undefined,

			/**
			 * @property	{Integer}	height
			 */
			height: undefined,

			/**
			 * @property	{Integer}	width
			 */
			width: undefined


        } );

        return PositionModel;
    }
);
define( function( require ) {
    
    var BaseView = require( 'view/BaseView' ),
        ArrowView;
    
    ArrowView = BaseView.extend( {
        
        /**
         * @property    {String}    tagName
         */
        tagName: 'div',
        
        /**
         * @property    {String}    className
         */
        className: 'arrow',
        
        /**
         * 
         * @returns {ArrowView}
         */
        render: function() {
            
            this.$el.css( 'top', this.model.get( 'yPos' ) - 35 );
            
            return this;
        }
        
    } );
    
    return ArrowView;
    
} );
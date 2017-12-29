define( function( require ) {
    
    var template = require( 'text!view/Detail/SkillTemplate.html' ),
        DetailView = require( 'view/DetailView' ),
        DetailSkillView;
    
    DetailSkillView = DetailView.extend( {
        
        initialize: function() {
            this.html = template;   
        }
        
    } );
    
    return DetailSkillView;
    
} );
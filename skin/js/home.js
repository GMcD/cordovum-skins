define([ 'jquery', 'underscore', 'backbone', 'text!tpl/homeTemplate.html'], 
    function( $, _, Backbone, homeTemplate ) {

    /*
     * Simple View
     */
    var HomeView = Backbone.View.extend({
        el : $('div#stage'),
        /*
         * Initialise and render
         */
        initialize: function(options){
            this.template = _.template( homeTemplate );
            this.render();
        },
        events : {
          'click button' : 'navigate'
        },
        navigate : function(ev){
            ev.preventDefault();
            $('div#navigation').toggleClass('offScreen');
            app.router.navigate(ev.currentTarget.id, { trigger: true });
        },
        /*
         * Renders Home View
         */
        render: function(){
            var html = this.template();
            this.$el.html(html);
            return this;
        },
    });

    return { View : HomeView };

});

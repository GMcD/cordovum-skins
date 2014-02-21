define(
        ['jquery', 'underscore', 'backbone', 'home'],
    function($, _, Backbone, Home){

    var Router = Backbone.Router.extend({
        routes: {
            '' : 'home'
        },

        /*
         * Initialize Router
         */
        initialize: function() {
            console.log('Router Initialization...');

            /*
             * Back is not a Route - Just navigate back via window history
             */
            $(document).on('click', '.back', function(e) {
                  e.preventDefault();
                  window.history.back();
            });

            /*
             * Now start routing requests
             */
            Backbone.history.start({pushState: false});
        },

        /*
         * Home View
         */
        home: function() {
            console.log('Home!');     
            var view = new Home.View();
        },

    });

    return { Router : Router };

});
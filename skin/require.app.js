require.config({
  baseUrl: '../',
  paths: {
    jquery          : 'bower_components/jquery/jquery',
    underscore      : 'bower_components/underscore/underscore',
    backbone        : 'bower_components/backbone/backbone',
    localstorage    : 'bower_components/backbone.localstorage/backbone.localStorage',
    modal           : 'bower_components/bootstrap-sass/js/modal',
    text            : 'bower_components/requirejs-text/text',
    modernizr       : 'bower_components/modernizr/modernizr',
    fastclick       : 'bower_components/fastclick/lib/fastclick',
    jcore           : 'bower_components/jquery-ui/ui/jquery.ui.core',
    jmouse          : 'bower_components/jquery-ui/ui/jquery.ui.mouse',
    jwidget         : 'bower_components/jquery-ui/ui/jquery.ui.widget',
    jdraggable      : 'bower_components/jquery-ui/ui/jquery.ui.draggable',
    jdroppable      : 'bower_components/jquery-ui/ui/jquery.ui.droppable',
    jtouch          : 'app/js/libs/jquery.ui.touch-punch',
    jsv             : 'app/js/libs/jsv',
    jsonform        : 'app/js/libs/jsonform',
    jscroll         : 'app/js/libs/jquery.jscrollpane',
    touchy          : 'app/js/libs/jquery.touchy',
    tpl             : 'app/tpl',
    home            : 'app/js/home',
    reader          : 'app/js/reader',
    router          : 'app/js/router',
    app             : 'app/js/app'
  },
  shim: {
    underscore: {
      exports: "_"
    },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    localstorage: {
      deps: ['underscore', 'jquery', 'backbone'],
      exports: 'Backbone.LocalStorage'
    },
    modernizr: {
      exports: 'Modernizr'
    },
    jsv: {
      exports: 'JSV'
    },
    jsonform: {
      deps: ['underscore', 'jquery', 'jsv'],
      exports: 'JSONForm'
    },
    modal: {
        deps: [ 'jquery' ],
        exports: 'jQuery.fn.modal'
    },
    jcore: {
        deps: [ 'jquery' ],
        exports: 'jQuery.ui'
    },
    jwidget: {
        deps: [ 'jquery', 'jcore' ],
        exports: 'jQuery.ui.widget'
    },
    jmouse: {
        deps: [ 'jquery', 'jcore', 'jwidget' ],
        exports: 'jQuery.ui.mouse'
    },
    jdraggable: {
        deps: [ 'jquery', 'jcore', 'jwidget', 'jmouse' ],
        exports: 'jQuery.ui.draggable'
    },
    jdroppable: {
        deps: [ 'jquery', 'jcore', 'jwidget', 'jmouse' ],
        exports: 'jQuery.ui.droppable'
    },
    jtouch : {
        deps: [ 'jquery', 'jcore', 'jwidget', 'jmouse', 'jdraggable', 'jdroppable' ],
        exports: 'jQuery.support.touch'
    },
    jscroll: {
      deps: ['jquery'],
      exports: 'jquery.jscrollpane'
    },
    touchy: {
      deps: ['jquery'],
      exports: 'jquery.touchy'
    },
  }
});

require(['app']);

require.config({
  baseUrl: '../',
  paths: {
    jquery          : 'bower/jquery/jquery',
    underscore      : 'bower/underscore/underscore',
    backbone        : 'bower/backbone/backbone',
    localstorage    : 'bower/backbone.localstorage/backbone.localStorage',
    modal           : 'bower/bootstrap-sass/js/modal',
    text            : 'bower/requirejs-text/text',
    modernizr       : 'bower/modernizr/modernizr',
    fastclick       : 'bower/fastclick/lib/fastclick',
    jcore           : 'bower/jquery-ui/ui/jquery.ui.core',
    jmouse          : 'bower/jquery-ui/ui/jquery.ui.mouse',
    jwidget         : 'bower/jquery-ui/ui/jquery.ui.widget',
    jdraggable      : 'bower/jquery-ui/ui/jquery.ui.draggable',
    jdroppable      : 'bower/jquery-ui/ui/jquery.ui.droppable',
    jtouch          : 'skin/js/libs/jquery.ui.touch-punch',
    jsv             : 'skin/js/libs/jsv',
    jsonform        : 'skin/js/libs/jsonform',
    jscroll         : 'skin/js/libs/jquery.jscrollpane',
    touchy          : 'skin/js/libs/jquery.touchy',
    utils           : 'skin/js/libs/utils',
    reach           : 'skin/js/libs/reach',
    fingerprint     : 'skin/js/libs/fingerprint',
    md5             : 'skin/js/libs/md5',
    sha1            : 'skin/js/libs/sha1',
    tpl             : 'skin/tpl',
    home            : 'skin/js/home',
    router          : 'skin/js/router',
    app             : 'skin/js/app'
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

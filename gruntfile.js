module.exports = function (grunt) {

    var appwww = 'dist/';

    grunt.initConfig({

        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                boss: true,
                devel: true,
                eqnull: true,
                browser: true,
                expr: true,
                globals: {
                    Backbone : true,
                    _ : true,
                    define : true,
                    require : true,
                    $ : true,
                    jQuery : true,
                    JSONForm : true,
                    console : true,
                    module : true,
                    app : true
                }
            },
            files: {
                src: [ 'skin/js/*.js' ]
            },
        },

        /* Copy Built and Required files for App packaging */
        copy: {
            main: {
                files: [
                    { src: 'skin/css/*', dest: appwww, expand: true },
                    { src: 'skin/js/**', dest: appwww, expand: true },
                    { src: 'skin/tpl/**', dest: appwww, expand: true },
                    { src: 'skin/img/**', dest: appwww, expand: true },
                    { src: 'skin/fonts/**', dest: appwww, expand: true },
                    { src: 'skin/app.html', dest: appwww, expand: true },
                    { src: 'skin/require.app.js', dest: appwww, expand: true },
/*                    { src: 'bower/requirejs/require.js', dest: appwww, expand: true },
                    { src: 'bower/requirejs-text/text.js', dest: appwww, expand: true },
                    { src: 'bower/backbone/backbone.js', dest: appwww, expand: true },
                    { src: 'bower/jquery/jquery.js', dest: appwww, expand: true },
                    { src: 'bower/underscore/underscore.js', dest: appwww, expand: true },
                    { src: 'bower/fastclick/lib/fastclick.js', dest: appwww, expand: true },
                    { src: 'bower/backbone/backbone.js', dest: appwww, expand: true },
                    { src: 'bower/backbone.localstorage/backbone.localStorage.js', dest: appwww, expand: true },
                    { src: 'bower/bootstrap-sass/js/modal.js', dest: appwww, expand: true },
                    { src: 'bower/requirejs-text/text.js', dest: appwww, expand: true },
                    { src: 'bower/modernizr/modernizr.js', dest: appwww, expand: true },
                    { src: 'bower/momentjs/moment.js', dest: appwww, expand: true },
                    { src: 'bower/jquery-ui/ui/jquery.ui.core.js', dest: appwww, expand: true },
                    { src: 'bower/jquery-ui/ui/jquery.ui.mouse.js', dest: appwww, expand: true },
                    { src: 'bower/jquery-ui/ui/jquery.ui.widget.js', dest: appwww, expand: true },
                    { src: 'bower/jquery-ui/ui/jquery.ui.draggable.js', dest: appwww, expand: true },
                    { src: 'bower/jquery-ui/ui/jquery.ui.droppable.js', dest: appwww, expand: true },
                    { src: 'bower/font-awesome/css/font-awesome.css', dest: appwww, expand: true },
                    { src: 'bower/font-awesome/fonts/*', dest: appwww, expand: true },
                    { src: 'bower/jscrollpane/style/jquery.jscrollpane.css', dest: appwww, expand: true },
                    { src: 'bower/jscrollpane/themes/lozenge/style/jquery.jscrollpane.lozenge.css', dest: appwww, expand: true },
                    { src: 'bower/jasmine/lib/jasmine-core/*.js', dest: appwww, expand: true },
                    { src: 'bower/jasmine/lib/jasmine-core/jasmine.css', dest: appwww, expand: true }, */
                    { src: 'skin/jasmine.html', dest: appwww, expand: true },
                    { src: 'skin/require.jasmine.js', dest: appwww, expand: true },
                    { src: 'skin/tests/**', dest: appwww, expand: true },
                ]
            },
        },
        // Web server to test against
        connect: {
            test : {
                port : 8000,
                base : ''
            }
        },
        // Test requires and their specs
        jasmine: {
            all: {
                src: [ 'jquery','underscore', 'home' ],
                options: {
                    keepRunner: true,
                    specs: ['skin/tests/*.js'],
                    host : 'http://127.0.0.1:8000/',
                    template: require('grunt-template-jasmine-requirejs'),
                    templateOptions: {
                        requireConfigFile: [ 'skin/require.app.js', 'skin/require.jasmine.js' ]
                    }
                }
            }
        },
        // Sass compile
        sass: {
            dist: {
                files: {
                    'skin/css/app.css' : 'skin/scss/app.scss'
                }
            }
        },
        // Uglify
        uglify: {
            files: { 
                src: ['js/*.js', '!js/*.min.js'],  // source files mask
                dest: 'dist/js',   // destination folder
                expand: true,    // allow dynamic building
                flatten: true,   // remove all unnecessary nesting
                rename  : function (dest, src) {
                    var folder    = src.substring(0, src.lastIndexOf('/'));
                    var filename  = src.substring(src.lastIndexOf('/'), src.length);
                    filename  = filename.substring(0, filename.lastIndexOf('.'));
                    return dest + folder + filename + '.min.js';
                }
            }
        },
        // CSS minify
        cssmin: {
            skin: {
                files: {
                    'dist/css/s.css': ['skin/css/app.css', 'bower/font-awesome/css/font-awesome.css', 'bower/jscrollpane/style/jquery.jscrollpane.css', 'bower/jscrollpane/themes/lozenge/style/jquery.jscrollpane.lozenge.css']
                }
            },
        },
        // Compile the entry points
        requirejs: {
            skin: {
                options: {
                    baseUrl: '.',
                    name: 'node_modules/almond/almond.js',
                    include: ['app','router'],
                    mainConfigFile: 'skin/require.app.js',
                    insertRequire: ['app'],
                    out: 'dist/js/opt.app.js',
                    optimize: 'none'
                }
            },

        },

        watch: {
            files: ['skin/**'],
            tasks: ['default'],
//            tasks: ['cordova'],
//            tasks: ['production'],
        },
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-rename');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
//    grunt.loadNpmTasks('grunt-cordovacli');

    /* SPA build test and push task */
    grunt.registerTask('default', [ 'jshint', 'sass', 'connect', 'jasmine', 'copy' ]);
    /* Task to build device packages */
    grunt.registerTask('cordova', [ 'sass', 'copy', 'cordovacli:cordova' ]);
    /* Initial Setup Task - Create Cordova App and add ios and android */
//    grunt.registerTask('setup', [ 'cordovacli:create', 'cordovacli:add_platforms' ]);
    /* Compile them up */
    grunt.registerTask('production', [ 'jshint', 'sass', 'connect', 'jasmine', 'cssmin', 'copy', 'requirejs' ]);

};

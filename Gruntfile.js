module.exports = function(grunt) {

    // configurable paths
    var yeomanConfig = {
        app: 'app',
        dist: 'dist',
        main: 'a_class_above'
    };

    try {
        yeomanConfig.app = require('./bower.json').appPath || yeomanConfig.app;
    } catch (e) {}

    grunt.initConfig({
        yeoman: yeomanConfig,
        pkg: grunt.file.readJSON('package.json'),
        karma: {
            unit: {
                options: {
                    frameworks: ['jasmine'],
                    browsers: ['PhantomJS'],
                    singleRun: false,
                    autoWatch: true,
                    files: [
                        'karma/phantomjs-hacks.js',
                        'node_modules/angular/angular.js',
                        'node_modules/angular-mocks/angular-mocks.js',
                        'scripts/<%= yeoman.main %>.js',
                        'scripts/**/*.js',
                        'spec/**/*.js'
                    ]
                }
            }
        },

        groc: {
            javascript: [
                "spec/**/*.js", "scripts/**/*.js", "doc.md"
            ],
            options: {
                "out": "doc/",
                "index": 'doc.md'
            }
        },

        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: ['.tmp', '<%= yeoman.dist %>/*', '!<%= yeoman.dist %>/.git*']
                }]
            },
            server: '.tmp'
        },

        concat: {
            dist: {
                src: ['scripts/<%= yeoman.main %>.js', 'scripts/**/*.js'],
                dest: '<%= yeoman.dist %>/<%= yeoman.main %>.js',
            },
        },

        uglify: {
            '<%= yeoman.dist %>/<%= yeoman.main %>.min.js': ['<%= yeoman.dist %>/<%= yeoman.main %>.js']
        }
    });

    grunt.loadNpmTasks('grunt-groc');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.registerTask('default', ['karma']);
    grunt.registerTask('build', [
        'clean:dist', 'concat', 'uglify'
    ]);
};
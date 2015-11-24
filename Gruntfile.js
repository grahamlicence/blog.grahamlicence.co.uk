/*
    Gruntfile. To run:
    - install node
    - run `npm install` in the root directory
    - type in `grunt` to do run the build
    - type in `grunt watch` whilst developing


    Check out the registerTask statements at the bottom for an idea of
    task grouping.
*/
module.exports = function(grunt) {

    /* load dependencies */

    require('load-grunt-tasks')(grunt, {
        pattern: ['grunt-*', 'assemble']
    });

    grunt.initConfig({


        pkg: grunt.file.readJSON('package.json'),

        // asset paths
        project: {
            sassDir: '<%= pkg.settings.sassPath %>',
            cssDir: '<%= pkg.settings.cssPath %>',
            cssDevDir: '<%= pkg.settings.cssDevPath %>',
            jsDir: '<%= pkg.settings.scriptsPath %>'
        },

        connect: {
            dev: {
                options: {
                    open: true,
                    port: 8000,
                    hostname: 'localhost',
                    base: './dist/'
                }
            }
        },

        assemble: {
          options: {
            collections: [{
                name: 'post',
                sortby: 'posted',
                sortorder: 'descending'
            }],
            helpers: './src/helpers/**/*.js',
            layout: 'page.hbs',
            layoutdir: './src/layouts/',
            partials: './src/partials/**/*.hbs'
          },
          posts: {
            files: [{
              cwd: './src/content/',
              dest: './dist/',
              expand: true,
              src: ['**/*.hbs', '!_pages/**/*.hbs']
            }, {
              cwd: './src/content/_pages/',
              dest: './dist/',
              expand: true,
              src: '**/*.hbs'
            }]
          }
        },

        copy: {
            js: {
                files: [
                  {expand: true, flatten: true, src: ['src/javascript/**'], dest: 'dist/assets/scripts', filter: 'isFile'}
                ]
            }
        },

        compass: {
            prod: {
                options: {
                    sassDir: '<%= project.sassDir %>',
                    cssDir: '<%= project.cssDir %>',
                    outputStyle: 'expanded',
                    noLineComments: true,
                    force: true,
                    sourcemap: true
                }
            },
            dev: {
                options: {
                    sassDir: '<%= project.sassDir %>',
                    cssDir: '<%= project.cssDevDir %>',
                    outputStyle: 'expanded',
                    noLineComments: false,
                    force: true,
                    sourcemap: true
                }
            }
        },

        watch: {
            html: {
                files: ['src/**/*.hbs'],
                tasks: ['assemble']
            },
            css: {
                files: 'src/sass/**/*.scss',
                tasks: ['compass:dev'],
                options: {
                    livereload: true
                }
            },
            js: {
                files: 'src/javascript/**/*.js',
                tasks: ['copy:js']
            }
        }

    });

    /* load every plugin in package.json */
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('assemble');

    // simple start
    grunt.registerTask('default', ['assemble', 'copy:js', 'compass:dev', 'connect', 'watch']);
};

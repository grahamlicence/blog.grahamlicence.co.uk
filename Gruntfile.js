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

        watch: {
            html: {
                files: ['src/content/**/*.hbs'],
                tasks: ['assemble']
            }
        }

    });

    /* load every plugin in package.json */
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('assemble');

    // simple start
    grunt.registerTask('default', ['assemble', 'connect', 'watch']);
};

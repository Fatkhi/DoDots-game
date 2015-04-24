module.exports = function (grunt) {

    grunt.initConfig({
        watch: {
            fest_tmpl: {
                files: ['templates/*.xml'],
                tasks: ['fest'],
                options: {
                    interrupt: true,
                    atBegin: true
                }
            },
            server: {
              files: [
                      'public_html/js/**/*.js', /* следим за статикой */
                      'public_html/css/**/*.css',
                      'public_html/*.html',
                      'public_html/**/*.html'
                  ],
              options: {
                  interrupt: true,
                  livereload: true /* перезагрузить страницу */
              }
            },
            sass_tmpl: {
              files: ['templates/sass/**/*.scss'],
              tasks: ['shell:clear_sass', 'sass', 'concat'],
              options: {
                atBegin: true
              }
            }
        },
        shell: {
            options: {
                stdout: true,
                stderr: true
            },
            server: {
                command: 'java -cp dodots.jar main.Main'
            },
            clear_sass: {
                command: 'rm -r -f ./templates/sass/css/'
            }
        },
        fest: {
            templates: {
                files: [{
                    expand: true,
                    cwd: 'templates',
                    src: '*.xml',
                    dest: 'public_html/js/tmpl'
                }],
                options: {
                    template: function (data) {
                        return grunt.template.process(
                            'define("<%= name %>Tmpl", [], function() { return <%= contents %> ;});',
                            {data: data}
                        );
                    }
                }
            }
        },
        concurrent: {
            target: ['watch', 'shell:server'],
            options: {
                logConcurrentOutput: true /* Вывод логов */
            }
        },
        sass: {
          css: {
            files: [{
              expand: true,
              style: 'expanded',
              cwd: 'templates/sass',
              src: '**/*.scss',
              dest: 'templates/sass/css',
              ext: '.css'
            }]
          }
        },
        concat: {
          dist: {
            src: ['templates/sass/css/**/*.css'],
            dest: 'public_html/css/all_sass.css'
          }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-fest');
    grunt.registerTask('default', ['concurrent']);
};

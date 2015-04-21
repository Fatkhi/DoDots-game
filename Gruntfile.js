module.exports = function (grunt) {

    grunt.initConfig({
        watch: {
            fest: {
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
            }
        },
        shell: {
            options: {
                stdout: true,
                stderr: true
            },
            server: {
                command: 'java -cp dodots.jar main.Main'
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
            target: ['watch', 'shell'],
            options: {
                logConcurrentOutput: true /* Вывод логов */
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-fest');
    grunt.registerTask('default', ['concurrent']);
};

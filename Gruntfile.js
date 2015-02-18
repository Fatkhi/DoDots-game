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
            }
        },
        server: {
            files: [
                    'public_html/js/**/*.js', /* следим за статикой */
                    'public_html/css/**/*.css'
                ],
            options: {
                interrupt: true,
                livereload: true /* перезагрузить страницу */
            }
        },
        connect: {
            server: {
                options: {
                    port: 9001,
                    base: 'www-root'
                }
            }
        },
        shell: {
            options: {
                stdout: true,
                stderr: true
            },
            server: {
                command: 'java -cp L1.2-1.0-jar-with-dependencies.jar main.Main 8080'
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
                            'var <%= name %>Tmpl = <%= contents %> ;',
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
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-fest');

    grunt.registerTask('default', ['concurrent']);



};
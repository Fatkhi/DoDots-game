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
                      'public_html/js/build.min.js', /* следим за статикой */
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
              tasks: ['shell:clear_sass', 'sass', 'autoprefixer'],
              options: {
                atBegin: true
              }
            },
            js: {
              files: ['public_html/js/**/!(build.min).js'],
              tasks: ['buildjs'],
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
              style: 'compressed',
              cwd: 'templates/sass',
              src: 'make.scss',
              dest: 'templates/sass/css',
              ext: '.css'
            }]
          }
        },
        autoprefixer: {
          options: {
            browsers: ['last 4 versions']
          },
          main: {
            src: 'templates/sass/css/make.css',
            dest: 'public_html/css/all_sass.css'
          }
        },
        requirejs: {
          build: {
            options: {
              almond: true,
              baseUrl: "public_html/js",
              mainConfigFile: "public_html/js/main.js",
              name: "main",
              optimize: "none",
              out: "public_html/js/build/main.js"
            }
          }
        },
        concat: {
          build: {
            separator: ';\n',
            src: [
              'public_html/js/lib/almond.js',
              'public_html/js/build/main.js'
            ],
            dest: 'public_html/js/build.js'
          }
        },
        uglify: {
          build: {
            files: {
              'public_html/js/build.min.js':
                ['public_html/js/build.js']
            }
          }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-fest');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.registerTask('default', ['concurrent']);
    grunt.registerTask('buildjs', ['fest', 'requirejs:build',
                                   'concat:build', 'uglify:build']);
};

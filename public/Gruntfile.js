'use strict';

module.exports = function(grunt) {
  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    ports: {
      livereload: true,
      test: 8888,
      dist: 9000,
      server: 9001
    },
    paths: {
      src: 'src',
      app: '<%= paths.src %>/app',
      dist: 'dist',
      test: '<%= paths.src %>/test',
      tmp: '.tmp'
    },
    watch: {
      options: {
        nospawn: true,
        livereload: '<%= connect.options.livereload %>'
      },
      stylus: {
        files: '<%= paths.app %>/views/styles/**/*.styl',
        tasks: ['stylus:server', 'concat:server']
      },
      js: {
        files: '<%= paths.app %>/**/*.js'
      },
      jade: {
        files: '<%= paths.app %>/**/*.jade'
      }
    },
    connect: {
      options: {
        port: '<%= ports.server %>',
        livereload: '<%= ports.livereload %>',
        hostname: 'localhost'
      },
      livereload: {
        options: {
          open: false,
          base: [
            '<%= paths.tmp %>',
            '<%= paths.src %>'
          ]
        }
      },
      dist: {
        options: {
          livereload: false,
          open: false,
          port: '<%= ports.dist %>',
          base: '<%= paths.dist %>'
        }
      },
      test: {
        options: {
          livereload: false,
          port: '<%= ports.test %>',
          base: '<%= paths.src %>',
          open: false
        }
      }
    },
    open: {
      server: {
        path: 'http://localhost:<%= connect.options.port %>'
      }
    },
    stylus: {
      server: {
        files: {
          '<%= paths.tmp %>/styles/main.css':
            '<%= paths.app %>/views/styles/application.styl'
        }
      },
      dist: {
        files: {
          '<%= paths.dist %>/styles/main.css':
            '<%= paths.app %>/views/styles/application.styl'
        }
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '<%= paths.dist %>'
          ]
        }]
      },
      server: '<%= paths.tmp %>'
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '<%= paths.app %>/**/*.js',
        '<%= paths.test %>/**/*.js'
      ]
    },
    requirejs: {
      dist: {
        // Options: 
        // https://github.com/jrburke/r.js/blob/master/build/example.build.js
        options: {
          name: 'main',
          mainConfigFile: '<%= paths.app %>/main.js',
          baseUrl: '<%= paths.app %>',
          optimize: 'uglify2',
          out: '<%= paths.dist %>/scripts/build.js',
          generateSourceMaps: true,
          preserveLicenseComments: false,
          useStrict: true,
          stubModules: ['text', 'json'],
          findNestedDependencies: true,
          // wrap: true,
          include: '../bower_components/requirejs/require'
          //uglify2: {} // https://github.com/mishoo/UglifyJS2
        }
      }
    },
    rev: {
      dist: {
        files: {
          src: [
            // '<%= paths.dist %>/scripts/{,*/}*.js',
            '<%= paths.dist %>/styles/{,*/}*.css',
            '<%= paths.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
            '<%= paths.dist %>/styles/fonts/{,*/}*.*'
          ]
        }
      }
    },
    useminPrepare: {
      html: '<%= paths.dist %>/index.html',
      options: {
        dest: '<%= paths.dist %>'
      }
    },
    usemin: {
      options: {
        dirs: ['<%= paths.dist %>']
      },
      html: ['<%= paths.dist %>/{,*/}*.html'],
      css: ['<%= paths.dist %>/styles/{,*/}*.css']
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= paths.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: '<%= paths.dist %>/images'
        }]
      }
    },
    processhtml: {
      dist: {
        files: {
          '<%= paths.dist %>/index.html': ['<%= paths.src %>/index.html']
        }
      }
    },
    cssmin: {
      dist: {
        files: {
          '<%= paths.dist %>/styles/main.css':
            '<%= paths.dist %>/styles/{,*/}*.css'
        }
      }
    },
    htmlmin: {
      dist: {
        options: {
          /*removeCommentsFromCDATA: true,
          // https://github.com/paths/grunt-usemin/issues/44
          //collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true*/
        },
        files: [{
          expand: true,
          cwd: '<%= paths.dist %>',
          src: '*.html',
          dest: '<%= paths.dist %>'
        }]
      }
    },
    copy: {
      dist: {
        files: [{
          dest: '<%= paths.dist %>/fonts',
          cwd: 'src/components/fonts',
          expand: true,
          flatten: true,
          filter: 'isFile',
          src: ['**/*']
        }, {
          expand: true,
          dot: true,
          cwd: '<%= paths.app %>/assets/images',
          dest: '<%= paths.dist %>/images/',
          src: '{,*/}*.{png,jpg,jpeg,gif}'
        }]
      },
      fonts: {
        dest: '<%= paths.tmp %>/fonts',
        cwd: 'src/components/fonts',
        expand: true,
        flatten: true,
        filter: 'isFile',
        src: ['**/*']
      },
      images: {
        expand: true,
        dot: true,
        cwd: '<%= paths.app %>/assets/images',
        dest: '<%= paths.tmp %>/images/',
        src: '{,*/}*.{png,jpg,jpeg,gif}'
      }
    },
    concat: {
      server: {
        files: {
          '<%= paths.tmp %>/styles/main.css': [
            '<%= paths.src %>/components/styles/**/*.css',
            '<%= paths.tmp %>/styles/main.css'
          ]
        }
      },
      dist: {
        files: {
          '<%= paths.dist %>/styles/main.css': [
            '<%= paths.src %>/components/styles/**/*.css',
            '<%= paths.dist %>/styles/main.css'
          ]
        }
      }
    },
    concurrent: {
      server: [
        'stylus:server',
        'copy:fonts',
        'copy:images'
      ],
      dist: [
        'stylus:dist',
        'imagemin',
        'htmlmin'
      ]
    },
    bower: {
      require: {
        rjsConfig: '<%= paths.app %>/main.js'
      },
      install: {
        options: {
          targetDir: './src/components',
          install: true
        }
      }
    },
    mocha: {
      all: {
        options: {
          urls: [
            'http://localhost:<%= connect.test.options.port %>/test/index.html'
          ]
        }
      }
    }
  });

  grunt.registerTask('default', [
    'jshint',
    'test'
  ]);

  grunt.registerTask('prepare', [
    'bower:install'
  ]);

  grunt.registerTask('server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'concurrent:server',
      'concat:server',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('test', [
    'connect:test',
    'mocha'
  ]);

  grunt.registerTask('build', function(environment) {
    if (environment === 'production') {
      grunt.config('requirejs.dist.options.generateSourceMaps', false);
      grunt.config('requirejs.dist.options.preserveLicenseComments', true);
    }
    
    grunt.task.run([
      'jshint',
      'test',
      'prepare',
      'clean:dist',
      'processhtml:dist',
      'useminPrepare',
      'concurrent:dist',
      'concat:dist',
      'requirejs',
      'cssmin',
      // 'uglify',
      'copy:dist',
      // 'rev',
      'usemin'
    ]);
  });

  grunt.registerTask('lint', [
    'jshint'
  ]);

};
'use strict';

module.exports = function(grunt) {
  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    // configurable paths
    yeoman: {
      src: 'src',
      app: '<%= yeoman.src %>/app',
      dist: 'dist',
      tmp: '.tmp'
    },
    watch: {
      options: {
        nospawn: true,
        livereload: '<%= connect.options.livereload %>'
      },
      stylus: {
        files: '<%= yeoman.app %>/styles/**/*.styl',
        tasks: ['stylus:server']
      },
      js: {
        files: '<%= yeoman.app %>/**/*.js'
      }
    },
    connect: {
      options: {
        port: 9001,
        livereload: true,
        hostname: 'localhost'
      },
      livereload: {
        options: {
          open: false,
          base: [
            '<%= yeoman.tmp %>',
            '<%= yeoman.src %>'
          ]
        }
      },
      dist: {
        options: {
          livereload: false,
          open: false,
          base: '<%= yeoman.dist %>'
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
          '<%= yeoman.tmp %>/styles/main.css': '<%= yeoman.app %>/views/styles/application.styl'
        }
      },
      dist: {
        files: {
          '<%= yeoman.dist %>/styles/main.css':
            '<%= yeoman.app %>/views/styles/main.styl'
        }
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '<%= yeoman.dist %>'
          ]
        }]
      },
      server: '<%= yeoman.tmp %>'
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '<%= yeoman.app %>/scripts/{,*/}*.js',
        '!<%= yeoman.app %>/scripts/vendor/*'
      ]
    },
    requirejs: {
      dist: {
        // Options: 
        // https://github.com/jrburke/r.js/blob/master/build/example.build.js
        options: {
          name: 'main',
          mainConfigFile: '<%= yeoman.app %>/scripts/main.js',
          baseUrl: '<%= yeoman.app %>/scripts',
          optimize: 'uglify2',
          out: '<%= yeoman.dist %>/scripts/build.js',
          generateSourceMaps: true,
          preserveLicenseComments: false,
          useStrict: true,
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
            // '<%= yeoman.dist %>/scripts/{,*/}*.js',
            '<%= yeoman.dist %>/styles/{,*/}*.css',
            '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
            '<%= yeoman.dist %>/styles/fonts/{,*/}*.*'
          ]
        }
      }
    },
    useminPrepare: {
      options: {
        dest: '<%= yeoman.dist %>'
      },
      html: '<%= yeoman.dist %>/index.html'
    },
    usemin: {
      options: {
        dirs: ['<%= yeoman.dist %>']
      },
      html: ['<%= yeoman.dist %>/{,*/}*.html'],
      css: ['<%= yeoman.dist %>/styles/{,*/}*.css']
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },
    processhtml: {
      dist: {
        files: {
          '<%= yeoman.dist %>/index.html': ['<%= yeoman.app %>/index.html']
        }
      }
    },
    cssmin: {
      dist: {
        files: {
          '<%= yeoman.dist %>/styles/main.css': '<%= yeoman.dist %>/styles/{,*/}*.css'
        }
      }
    },
    htmlmin: {
      dist: {
        options: {
          /*removeCommentsFromCDATA: true,
          // https://github.com/yeoman/grunt-usemin/issues/44
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
          cwd: '<%= yeoman.dist %>',
          src: '*.html',
          dest: '<%= yeoman.dist %>'
        }]
      }
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,png,txt}',
            'images/{,*/}*.{webp,gif}'
          ]
        }]
      },
      styles: {
        expand: true,
        dot: true,
        cwd: '<%= yeoman.app %>/views/styles',
        dest: '<%= yeoman.tmp %>/styles/',
        src: '{,*/}*.css'
      }
    },
    concurrent: {
      server: [
        'stylus:server',
        'copy:styles',
      ],
      dist: [
        'stylus:dist',
        'imagemin',
        'htmlmin'
      ]
    },
    bower: {
      all: {
        rjsConfig: '<%= yeoman.app %>/main.js'
      }
    }
  });

  grunt.registerTask('default', [
    'jshint'
  ]);

  grunt.registerTask('server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'concurrent:server',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('test', [
  ]);

  grunt.registerTask('build', function(target, environment) {
    if (environment === 'production') {
      grunt.config('requirejs.dist.options.generateSourceMaps', false);
      grunt.config('requirejs.dist.options.preserveLicenseComments', true);
    }
    
    grunt.task.run([
      'jshint',
      'clean:dist',
      'processhtml:dist',
      'useminPrepare',
      'concurrent:dist',
      'requirejs',
      'css_selectors',
      'string-replace',
      'cssmin',
      'uglify',
      'copy:dist',
      'rev',
      'usemin'
    ]);
  });

  grunt.registerTask('lint', [
    'jshint'
  ]);

};
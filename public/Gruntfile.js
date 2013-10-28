module.exports = function(grunt) {
  'use strict';

  // Underscore
  // ==========
  var _ = grunt.util._;

  // Package
  // =======
  var pkg = require('./package.json');

  // Configuration
  // =============
  grunt.initConfig({

    // Cleanup
    // -------
    clean: {
      temp: 'temp',
      bower: 'bower_components',
      components: 'src/components'
    },

    // Wrangling
    // ---------
    copy: {
      options: {
        excludeEmpty: true
      },

      'static': {
        files: [{
          dest: 'temp',
          cwd: 'src',
          expand: true,
          src: [
            '**/*',
            '!*.hbs',
            '!**/app/views/styles/**',
            '!**/app/assets/**'
          ]
        }, {
          dest: 'temp/images',
          cwd: 'src/app/assets/images',
          expand: true,
          src: ['**/*']
        }, {
          dest: 'temp/images',
          cwd: 'src/components/images',
          expand: true,
          flatten: true,
          filter: 'isFile',
          src: ['**/*']
        }, {
          dest: 'temp/fonts',
          cwd: 'src/components/fonts',
          expand: true,
          flatten: true,
          filter: 'isFile',
          src: ['**/*']
        }],
      }
    },

    // Dependency management
    // ---------------------
    bower: {
      install: {
        options: {
          targetDir: './src/components',
          cleanup: true,
          install: true
        }
      }
    },

    // Stylesheet Concat
    // -----------------
    concat: {
      css: {
        files: {
          'temp/styles/main.css': ['src/components/styles/**/*.css', 'temp/styles/main.css']
        }
      }
    },

    // Stylesheet Preprocessor
    // -----------------------
    stylus: {
      compile: {
        files: {
          'temp/styles/main.css': 'src/app/views/styles/**/*.styl'
        }
      }
    },

    // Script lint
    // -----------
    jshint: {
      options: {
        'curly': true,
        'eqeqeq': true,
        'immed': true,
        'latedef': true,
        'newcap': true,
        'noarg': true,
        'sub': true,
        'undef': true,
        'boss': true,
        'eqnull': true,
        'node': true,
        'browser': true,
        'predef': [
          'define',
          'require',
          'log'
        ],
      },
      src: [
        'src/app/**/*.js',
        '!src/scripts/vendor/**/*'
      ]
    },

    // Webserver
    // ---------
    connect: {
      options: {
        port: 3501,
        hostname: 'localhost',
        middleware: function(connect, options) { return [
          require('connect-url-rewrite')(['^([^.]+|.*\\?{1}.*)$ /']),
          require('connect-livereload')(),
          connect.static(options.base),
          connect.directory(options.base)
        ]; }
      },

      temp: {
        options: {
          base: 'temp'
        }
      }
    },

    // Watch
    // -----
    watch: {
      options: {
        spawn: false,
        livereload: true
      },
      js: {
        files: ['src/app/**/*.js', 'src/test/**/*.js'],
        tasks: ['copy:static']
      },
      jade: {
        files: 'src/app/views/templates/**/*.jade',
        tasks: ['copy:static']
      },
      stylus: {
        files: 'src/app/views/styles/**/*.styl',
        tasks: ['stylus:compile', 'concat:css']
      },
    },
  });

  // Dependencies
  // ============
  for (var name in pkg.devDependencies) {
    if (name.substring(0, 6) === 'grunt-') {
      grunt.loadNpmTasks(name);
    }
  }

  // Tasks
  // =====

  // Lint
  // ----
  // Lints all applicable files.
  grunt.registerTask('lint', [
    'jshint'
  ]);

  // Prepare
  // -------
  // Cleans the project directory of built files and downloads / updates
  // bower-managed dependencies.
  grunt.registerTask('prepare', [
    'clean',
    'bower:install',
    'clean:bower',
  ]);

  // Server
  // ------
  // Compiles a development build of the application; starts an HTTP server
  // on the output; and, initiates a watcher to re-compile automatically.
  grunt.registerTask('server', [
    'clean:temp',
    'copy:static',
    'stylus:compile',
    'concat:css',
    'connect:temp',
    'watch'
  ]);

};

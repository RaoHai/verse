'use strict';

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  grunt.initConfig({
    watch: {
        compass: {
            files: ['public/scss/{,*/}*.{scss,sass}'],
            tasks: ['compass:server']
        }
    },
    compass: {
      options: {
        sassDir: 'public/scss',
        cssDir: 'public/css',
        relativeAssets: false,
        assetCacheBuster: false
      },
      server: {
        options: {
          debugInfo: true
        }
      }
    },
  });
  grunt.registerTask('serve', function (target) {
    grunt.task.run([
        'compass',
        'watch'
    ]);
  });

};
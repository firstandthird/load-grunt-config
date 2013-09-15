module.exports = function(grunt) {

  require('./lib/load-config')(grunt);

  grunt.registerTask('test', ['simplemocha']);
  grunt.registerTask('default', ['jshint', 'test', 'notify']);

};

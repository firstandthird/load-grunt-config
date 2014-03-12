/* global suite, test */
var assert = require('assert');
var loadGruntConfig = require('../');

suite('index', function() {

  var grunt = {};

  test('should default to grunt dir', function() {

    loadGruntConfig(grunt, options);
    
  });

  suite('package.json', function() {
    test('should allow for <%= package.name %> ', function() {

    });
 
  });

  suite('grunt.initConfig', function() {

    test('should call by default', function() {
      
    });

    test('should not call if init: false', function() {
      
    });
    
  });


  suite('load-grunt-tasks', function() {

    test('should call by default', function() {
      
    });

    test('should not call if loadGruntTasks: false', function() {
      
    });
    
  });


  suite('aliases', function() {
    test('should registerTask for each alias', function() { 

    });
  });

  
});

/* global suite,test */

var assert = require('assert');
var readfile = require('../lib/readfile');

suite('readfile', function() {

  test('read non-existing file', function() {
    assert.throws(function() {
      readfile(__dirname+'/config/fakefile.yaml');
    });
  });

  test('read yaml file', function() {
    var yaml = readfile(__dirname+'/config/yamlfile.yaml');
    assert.equal(yaml.yamlFile.options.filename, 'read.yaml');
  });

  test('read yml file', function() {
    var yaml = readfile(__dirname+'/config/ymlfile.yml');
    assert.equal(yaml.ymlFile.options.filename, 'read.yml');
  });

  test('read json file', function() {
    var json = readfile(__dirname+'/config/jsonfile.json');
    assert.equal(json.jsonFile.options.filename, 'read.json');
  });

  test('read js object file', function() {
    var json = readfile(__dirname+'/config/jsobj.js');
    assert.equal(json.jsobjFile.options.filename, 'jsobj.js');
  });

  test('read js file with function, returns function', function() {
    var fn = readfile(__dirname+'/config/jsfun.js');
    assert.equal(typeof fn, 'function');
    //fn takes two args, grunt and options
    var obj = fn({}, { test: 1 });
    assert.equal(obj.jsFunFile.options.filename, 'jsfun.js');
    assert.equal(obj.jsFunFile.options.test, 1);
  });

  test('read coffee file', function() {
    var json = readfile(__dirname+'/config/coffeefile.coffee');
    assert.equal(json.coffeeFile.options.filename, 'read.coffee');
  });

  test('read missing coffee file', function() {
    assert.throws(function() {
      readfile(__dirname+'/config/coffeefile2.coffee');
    });
  });

  test('read unsupported file', function() {
    assert.throws(function() {
      readfile(__dirname+'/config/htmlfile.html');
    });
  });

});

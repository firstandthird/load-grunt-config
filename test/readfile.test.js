/* global suite,test */

var assert = require('assert');
var readfile = require('../lib/readfile');

suite('readfile', function() {

  test('read non-existing file', function(done) {
    readfile(__dirname+'/fixtures/fakefile.yaml', function(err, yaml) {
      assert.notEqual(err, null);
      assert.equal(yaml, null);
      done();
    });

  });

  test('read yaml file', function(done) {
    readfile(__dirname+'/fixtures/yamlfile.yaml', function(err, yaml) {
      assert.equal(yaml.yamlFile.options.filename, 'read.yaml');
      done();
    });
  });

  test('read yml file', function(done) {
    readfile(__dirname+'/fixtures/ymlfile.yml', function(err, yaml) {
      assert.equal(yaml.ymlFile.options.filename, 'read.yml');
      done();
    });
  });

  test('read json file', function(done) {
    readfile(__dirname+'/fixtures/jsonfile.json', function(err, json) {
      assert.equal(json.jsonFile.options.filename, 'read.json');
      done();
    });
  });

  test('read js object file', function(done) {
    readfile(__dirname+'/fixtures/jsobj.js', function(err, json) {
      assert.equal(json.jsobjFile.options.filename, 'jsobj.js');
      done();
    });
  });

  test('read js file with function, returns function', function(done) {
    readfile(__dirname+'/fixtures/jsfun.js', function(err, fn) {
      assert.equal(typeof fn, 'function');
      //fn takes two args, grunt and options
      var obj = fn({}, { test: 1 });
      assert.equal(obj.jsFunFile.options.filename, 'jsfun.js');
      assert.equal(obj.jsFunFile.options.test, 1);
      done();
    });
  });

  test('read coffee file', function(done) {
    readfile(__dirname+'/fixtures/coffeefile.coffee', function(err, json) {
      assert.equal(json.coffeeFile.options.filename, 'read.coffee');
      done();
    });
  });

  test('read missing coffee file', function(done) {
    readfile(__dirname+'/fixtures/coffeefile2.coffee', function(err, json) {
      assert.notEqual(err, null);
      assert.equal(json, null);
      done();
    });
  });

  test('read unsupported file', function(done) {
    readfile(__dirname+'/fixtures/htmlfile.html', function(err, json) {
      assert.notEqual(err, null);
      assert.equal(json, null);
      done();
    });
  });

});

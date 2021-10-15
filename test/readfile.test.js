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
    assert.equal(yaml.yamlFile.options.regexp, '/(\\d{1,})\\%/');
  });

  test('read yml file', function() {
    var yaml = readfile(__dirname+'/config/ymlfile.yml');
    assert.equal(yaml.ymlFile.options.filename, 'read.yml');
    assert.equal(yaml.ymlFile.options.regexp, '/(\\d{1,})\\%/');
  });

  test('read cson file', function() {
    var cson = readfile(__dirname+'/config/csonfile.cson');
    assert.equal(cson.csonFile.options.filename, 'read.cson');
  });

  test('read json file', function() {
    var json = readfile(__dirname+'/config/jsonfile.json');
    assert.equal(json.jsonFile.options.filename, 'read.json');
    assert.equal(json.jsonFile.options.regexp, '/(\\d{1,})\\%/');
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

  test('read cjs object file', function() {
    var json = readfile(__dirname+'/config/cjsobj.cjs');
    assert.equal(json.cjsobjFile.options.filename, 'cjsobj.cjs');
  });

  test('read cjs file with function, returns function', function() {
    var fn = readfile(__dirname+'/config/cjsfun.cjs');
    assert.equal(typeof fn, 'function');
    //fn takes two args, grunt and options
    var obj = fn({}, { test: 1 });
    assert.equal(obj.cjsFunFile.options.filename, 'cjsfun.cjs');
    assert.equal(obj.cjsFunFile.options.test, 1);
  });

  test('read unsupported file', function() {
    assert.throws(function() {
      readfile(__dirname+'/config/htmlfile.html');
    });
  });

});

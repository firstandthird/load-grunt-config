var path = require('path');
var yaml = require('js-yaml');
var cson = require('cson');
var fs = require('fs');

module.exports = function(file) {

    // check for existence first
    if (!fs.existsSync(file)) {
        throw new Error(file + ' doesn\'t exist');
    }

    var ext = path.extname(file);

    // YAML file
    if (ext.match(/ya?ml/)) {
        var res = fs.readFileSync(file, 'utf8');
        return yaml.safeLoad(res, { schema: yaml.DEFAULT_FULL_SCHEMA });
    }

    // CSON file
    if (ext.match(/cson/)) {
        return cson.parseFileSync(file);
    }

    // JS / JSON / CoffeeScript
    if (ext.match(/json|js|coffee|ls/)) {
        return require(file);
    }

    // unknown
    throw new Error(file + ' is an unsupported filetype');

};

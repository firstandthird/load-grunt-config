var path = require('path');
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
        var yaml = require('js-yaml');
        var REGEXP_TYPE = require('js-yaml-js-types').regexp;
        if (!(REGEXP_TYPE instanceof yaml.Type)) {
            console.warn('Invalid js-yaml extension type type:', REGEXP_TYPE);
        }
        var schema = yaml.DEFAULT_SCHEMA.extend(REGEXP_TYPE);
        return yaml.load(res, { schema: schema });
    }

    // CSON file
    if (ext.match(/cson/)) {
        var cson = require('cson');
        return cson.parseCSONFile(file);
    }

    // JS / JSON / CoffeeScript
    if (ext.match(/json|js|coffee|ls/)) {
        if (!path.isAbsolute(file)) {
            file = path.join(process.cwd(), file);
        }
        return require(file);
    }

    // unknown
    throw new Error(file + ' is an unsupported filetype');

};

#grunt-load-config

Grunt plugin that lets you break up your Gruntfile config by task.  For most projects a single Gruntfile.js is perfect, but as projects grow, the Grunfile.js can get to a point where it's unmanagable.  That's where grunt-load-config comes in.  It was heavily inspired by [this article](http://www.thomasboyt.com/2013/09/01/maintainable-grunt.html).

##Features

- Each task has it's own config file. Example: jshint.js, mocha.js, etc.
- Auto load all grunt plugins.  Uses [load-grunt-tasks](https://github.com/sindresorhus/load-grunt-tasks).
- Auto expose package.json (<%= package.name %>) options and environment vars (<%= env.USER %>).
- Support for YAML files

##Installation

`npm install -D grunt-load-config`

##Example

Basic Gruntfile.js
```javascript
module.exports = function(grunt) {

	require('grunt-load-config')(grunt);

	grunt.registerTask('default', ['jshint', 'mocha', 'notify']);

};
```

Gruntfile.js with options
```javascript
module.exports = function(grunt) {

	require('grunt-load-config')(grunt, {
		configPath: 'grunt', //path to task.js files
		init: true, //auto grunt.initConfig
		config: { //additional config vars
			test: false
		}
	});

	grunt.registerTask('default', ['jshint', 'mocha']);

};
```

grunt/jshint.js
```javascript
module.exports = {
	all: ['Gruntfile.js', 'lib/**/*.js', 'test/**/*.js']
}
```

grunt/notify.yaml
```yaml
default:
  options:
    message: 'Default finished'
```

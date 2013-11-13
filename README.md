#load-grunt-config

Grunt plugin that lets you break up your Gruntfile config by task.  For most projects a single Gruntfile.js is perfect, but as projects grow, the Grunfile.js can get to a point where it's unmanagable.  That's where load-grunt-config comes in.  It was heavily inspired by [this article](http://www.thomasboyt.com/2013/09/01/maintainable-grunt.html).

##Features

- Each task has it's own config file. Example: jshint.js, mocha.js, etc.
- Auto load all grunt plugins.  Uses [load-grunt-tasks](https://github.com/sindresorhus/load-grunt-tasks).
- Auto expose package.json (<%= package.name %>) options.
- Support for YAML files
- Support for coffee files
- Easily register task aliases with aliases.yaml

##Installation

`npm install -D load-grunt-config`

##Example

Basic Gruntfile.js
```javascript
module.exports = function(grunt) {

	require('load-grunt-config')(grunt);

};
```

Gruntfile.js with options
```javascript
module.exports = function(grunt) {

	require('load-grunt-config')(grunt, {
		configPath: path.join(process.cwd(), 'grunt'), //path to task.js files, defaults to grunt dir
		init: true, //auto grunt.initConfig
		config: { //additional config vars
			test: false
		},
		loadGruntTasks: { //can optionally pass options to load-grunt-tasks.  If you set to false, it will disable auto loading tasks.
			pattern: 'grunt-',
			config: require('./package.json'),
			scope: 'devDependencies'
		}
	});

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

grunt/task.coffee
```coffee
module.exports =
  options:
    bare: true
```

grunt/aliases.yaml
```yaml
default:
	- 'jshint'
	- 'mocha'
	- 'notify'
```

#load-grunt-config

load-grunt-config is a Grunt library that allows you to break up your Gruntfile config by task.  For most small projects a single Gruntfile.js is perfect. But as a project grows, the Gruntfile.js can quickly become unmanagable; this is where load-grunt-config comes in handy.  It was heavily inspired by [Thomas Boyt's "More Maintainable Gruntfiles"](http://www.thomasboyt.com/2013/09/01/maintainable-grunt.html).

##Features

- Each task has its own config file. Example: jshint.js, mocha.js, etc.
- Auto load all grunt plugins.  Uses [load-grunt-tasks](https://github.com/sindresorhus/load-grunt-tasks). (Optionally it can use [jit-grunt](https://github.com/shootaroo/jit-grunt))
- Auto expose package.json (`<%= package.name %>`).
- Support for YAML files.
- Support for coffeescript files.
- Support for returning a function.
- [Easily register task aliases](#aliases) with `aliases.(js|json|yaml|coffee)`.
- [Config overrides](#custom-config)
- [Config grouping](#config-grouping)

##Installation

```bash
npm install -D load-grunt-config
```

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
	var path = require('path');
	
	require('load-grunt-config')(grunt, {
		configPath: path.join(process.cwd(), 'grunt'), //path to task.js files, defaults to grunt dir
		init: true, //auto grunt.initConfig
		data: { //data passed into config.  Can use with <%= test %>
			test: false
		},
		loadGruntTasks: { //can optionally pass options to load-grunt-tasks.  If you set to false, it will disable auto loading tasks.
			pattern: 'grunt-*',
			config: require('./package.json'),
			scope: 'devDependencies'
		}
	});

};
```

Optionally you can use [jit-grunt](https://github.com/shootaroo/jit-grunt) instead of [load-grunt-tasks](https://github.com/sindresorhus/load-grunt-tasks)
```javascript
module.exports = function(grunt) {

	require('load-grunt-config')(grunt, {
		// ...
		jitGrunt: { 
			//here you can pass options to jit-grunt (or just jitGrunt: true)
		}
	});

};
```
Note: if you have problems with auto loading of some tasks please check [jit-grunt#static-mappings](https://github.com/shootaroo/jit-grunt#static-mappings)

###Grunt tasks files

Here's what the files in your `grunt/` folder could look like.  You can use either .js, .json, .yaml, or .coffee - whatever you prefer and you can mix and match as you see fit.

Example js file returning an object - `grunt/watch.js`
```javascript
module.exports = {
  all: {
    files: [
      '<%= jshint.all %>',
      'grunt/*.yaml'
    ],
    tasks: [
      'default'
    ]
  }
};
```

Example js file returning a function - `grunt/jshint.js`
```javascript
module.exports = function (grunt, options) {
  return {
    all: [
      'Gruntfile.js',
      'grunt/*.js',
      'lib/*.js',
      'test/*.js',
      options.someFile
    ]
  };
};
```

Example json file - `grunt/clean.json`
```json
{
  "all": [
    "<%= project.dest %>",
    "target/*.js"
  ]
}
```

Example yaml file - `grunt/notify.yaml`
```yaml
default:
  options:
    message: 'Default finished'
```

Example coffee file - `grunt/task.coffee`
```coffee
module.exports =
  options:
    bare: true
```

###Aliases

If your `grunt/` folder contains an `aliases.(js|.json|yaml|coffee)` file, `load-grunt-config` will use that to define your tasks aliases (like `grunt.registerTask('default', ['jshint']);`).

grunt/aliases.yaml
```yaml
default:
  - 'jshint'
  - 'mocha'
  - 'notify'
```

### Custom Config

There are certain scenarios where you might have a base config for your team, and you want to be able to override some of the config based on your personal setup.  You can do that with the `overridePath` property.  In this case, the library will merge the two, with the override path taking priority.  For example:

```javascript
module.exports = function(grunt) {

  require('load-grunt-config')(grunt, {
    configPath: path.join(process.cwd(), 'vendor'),
    overridePath: path.join(process.cwd(), 'config-'+process.env.USER)
  });

};
```

### Config Grouping

`load-grunt-config` also supports grouping tasks.  This is handy when you want to group all of your script or css tasks together.  To do that, just add the suffix `-tasks` to your config filename and `load-grunt-config` will treat the filename as the task target and the top level keys as the task names.

Here's an example

Filename: `/config/scripts-tasks.yaml`
```yaml
jshint:
  files:
    - '*.js'
watch:
  files:
    - '*.js'
  tasks:
    - 'scripts'
```

This would be the equivalent in your `Gruntfile.js`:
```javascript
{
  jshint: {
    scripts: {
      files: [
        '*.js'
      ]
    }
  },
  watch: {
    scripts: {
      files: [
        '*.js'
      ],
      tasks: [
        'scripts'
      ]
    }
  }
}
```




0.10.0 / 2014-06-17 
==================

  * fixed support for json config files (SolomoN-ua)
  * Allow just-in-time loading (SolomoN-ua)

0.9.2 / 2014-05-12 
==================

  * Allow group config files to return a function.
  * Livescript support

0.9.1 / 2014-05-04 
==================

  * fix for mix and matching config grouping and task based config
  * fixed readme

0.9.0 / 2014-05-04 
==================

  * added support for config groupings
  * fixed ghpage config

0.8.0 / 2014-04-16 
==================

  * re-styling readfile.js a bit.
  * Merge pull request #35 from defaude/master
  * Fixing stupid typo...
  * Using js-yaml's safeLoad for YAML files instead of a simple require. Closes #28

0.8.0beta2 / 2014-03-20 
==================

  * fixed bug where package.json wasn't getting added to config object. fixes #46

0.8.0beta1 / 2014-03-14 
==================

  * updated readme
  * fixed exposing config/data to main grunt config
  * refactored everything to be sync
  * removed legacy files
  * finished up index.js functionality and tests
  * more tests passing on index.js
  * initial work on main lib
  * feat(gruntconfig): set up method with tests
  * refactor(tests): moved fixtures into config folder, added output fixture
  * refactor(readconfigdir): use extname and basename instead of regex
  * feat(readConfigDir): added new method
  * refactor(load-config.test): skip tests for now
  * feat(readfile): check if file exists
  * readfile with tests
  * switched build files to use yaml

0.7.2 / 2014-03-12 
==================

  * Using js-yaml's safeLoad for YAML files instead of a simple require. Closes #28

0.7.1 / 2014-02-14 
==================

  * Use lodash-node instead of `grunt.util._` (shinnn)
  * Update dependencies and devDependencies (shinnn)
  * added the .yml extension as an option for loading yaml files (travi)

0.7.0 / 2013-11-11 
==================

  * added support for aliases file to easily register task aliases.  fixes #5

0.6.1 / 2013-10-31 
==================

  * use merge so empty objects don't kill settings [dylang]
  * updated readme to add coffee support
  * updated readme

0.6.0 / 2013-10-27 
==================

  * bumped load-grunt-tasks dep.  Fixes #10
  * configPath is now absolute.  Fixes #11
  * Feature: enabled coffee-script support for config files
  * updated readme

0.5.0 / 2013-10-02 
==================

  * Adding a test for functions that return options [cbas]
  * Pass grunt reference to function options [cbas]

0.4.1 / 2013-09-19 
==================

  * changed load-grunt-tasks to loadGruntTasks #7

0.4.0 / 2013-09-19 
==================

  * updated readme for load-grunt-tasks option passing. #7
  * ability to pass options to load-grunt-tasks.  fixes #7

0.3.1 / 2013-09-17 
==================

  * removed env option so it doesn't conflict with grunt-env.  fixes #6

0.3.0 / 2013-09-16 
==================

  * renamed to load-grunt-config

0.2.1 / 2013-09-15 
==================

  * fixed missing dep

0.2.0 / 2013-09-15 
==================

  * Added License.  fixes #2
  * Added support for yaml files.  fixes #3
  * typo in readme.  fixes #1

0.1.1 / 2013-09-13 
==================

  * added { config: {} } support

0.1.0 / 2013-09-13 
==================

  * working commit
  * Initial commit

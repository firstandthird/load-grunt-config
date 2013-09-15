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

module.exports = {
  aliases: {
    default: [
      'test'
    ],
    anotherTask: {
      description: 'This is an awesome task',
      tasks: [
        'foo',
        'bar'
      ]
    },
    functionTask: function () {},
    functionTaskWithDescription: {
      description: 'This is a function task with description',
      tasks: function () {}
    }
  }
};

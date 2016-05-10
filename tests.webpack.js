//Next, we need our single file, which will actually use the webpack require API to find the files we need automagically.

var context = require.context('./app', true, /-test\.js$/);
context.keys().forEach(context);
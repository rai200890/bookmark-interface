require('angular');
require('angular-mocks/angular-mocks');

var context = require.context('../app/', true, /\.js$/);

context.keys().forEach(context);

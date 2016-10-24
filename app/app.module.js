var angular = require('angular'),
  uirouter = require('angular-ui-router'),
  uibootstrap = require('angular-ui-bootstrap'),
  localstorage = require('angular-local-storage'),
  jwt = require('angular-jwt'),
  uiRouterExtras = require('ui-router-extras'),
  permission = require('angular-permission/dist/angular-permission'),
  uiPermission = require('angular-permission/dist/angular-permission-ui'),
  angularBootstrapConfirm = require('angular-bootstrap-confirm');

var loginController = require('./controllers/login.controller');
var signUpController = require('./controllers/signup.controller');
var bookmarkListController = require('./controllers/bookmark.list.controller');
var userEditController = require('./controllers/user.edit.controller');
var userListController = require('./controllers/user.list.controller');

var bmAlerts = require("./directives/bmAlerts");

var auth = require('./services/auth');
var bookmark = require('./services/bookmark');
var user = require('./services/user');


var MODULE_NAME = 'app';
var API_URL = process.env.API_URL;
var WHITELISTED_DOMAINS = process.env.WHITELISTED_DOMAINS.split(",");

var config = require('./app.config');
var run = require('./app.run');

var app = angular.module(MODULE_NAME, [uirouter, ('ct.ui.router.extras.core'),
    permission, uiPermission, uibootstrap, localstorage, jwt, angularBootstrapConfirm,
  ])
  .controller('LoginController', loginController)
  .controller('SignUpController', signUpController)
  .controller('BookmarkListController', bookmarkListController)
  .controller('UserListController', userListController)
  .controller('UserEditController', userEditController)
  .directive('bmAlerts', bmAlerts)
  .service('Auth', auth)
  .service('Bookmark', bookmark)
  .service('User', user)
  .constant('API_URL', API_URL)
  .constant('WHITELISTED_DOMAINS', WHITELISTED_DOMAINS)
  .config(config).run(run);

module.exports = app;

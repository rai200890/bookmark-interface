var angular = require('angular');
var uirouter = require('angular-ui-router');
var uibootstrap = require('angular-ui-bootstrap');
var localstorage = require('angular-local-storage');
var jwt = require('angular-jwt');
var angularBootstrapConfirm = require('angular-bootstrap-confirm');

var loginController = require('./controllers/login.controller');
var signUpController = require('./controllers/signup.controller');
var bookmarkListController = require('./controllers/bookmark.list.controller');

var bmAlerts = require("./directives/bmAlerts");

var auth = require('./services/auth');
var bookmark = require('./services/bookmark');
var user = require('./services/user');


var MODULE_NAME = 'app';
var API_URL = process.env.API_URL;
var WHITELISTED_DOMAINS = process.env.WHITELISTED_DOMAINS.split(",");

var config = require('./app.config');
var run = require('./app.run');

var app = angular.module(MODULE_NAME, [uirouter, uibootstrap, localstorage, jwt, angularBootstrapConfirm])
    .controller('LoginController', loginController)
    .controller('SignUpController', signUpController)
    .controller('BookmarkListController', bookmarkListController)
    .directive('bmAlerts', bmAlerts)
    .service('Auth', auth)
    .service('Bookmark', bookmark)
    .service('User', user)
    .constant('API_URL', API_URL)
    .constant('WHITELISTED_DOMAINS', WHITELISTED_DOMAINS)
    .config(config).run(run);

module.exports = app;

var angular = require('angular');
var uirouter = require('angular-ui-router');
var uibootstrap = require('angular-ui-bootstrap');
var localstorage = require('angular-local-storage');
var jwt = require('angular-jwt');

var loginController = require('./controllers/login.controller');
var signUpController = require('./controllers/signup.controller');

var auth = require('./services/auth.service');

var MODULE_NAME = 'app';
var API_URL = process.env.API_URL;

var config = require('./app.config');
var run = require('./app.run');

var app = angular.module(MODULE_NAME, [uirouter, uibootstrap, localstorage, jwt])
    .controller('LoginController', loginController)
    .controller('SignUpController', signUpController)
    .service('Auth', auth)
    .constant('API_URL', API_URL)
    .config(config).run(run);

module.exports = app;

'use strict';

var angular = require('angular');
var uirouter = require('angular-ui-router');
var uibootstrap = require('angular-ui-bootstrap');
var localstorage = require('angular-local-storage');
var jwt = require('angular-jwt');

var loginController = require('./controllers/LoginController');
var signUpController = require('./controllers/SignUpController');

var auth = require('./services/auth');

var MODULE_NAME = 'app';
var APP_URL = 'http://localhost:5000';

var config = require('./config.js');

var app = angular.module(MODULE_NAME, [uirouter, uibootstrap, localstorage, jwt])
                 .controller('LoginController', loginController)
                 .controller('SignUpController', signUpController)
                 .service('Auth', auth)
                 .value('APP_URL', APP_URL)
                 .config(config);

module.exports = app;

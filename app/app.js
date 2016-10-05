'use strict';

var angular = require('angular');
var uirouter = require('angular-ui-router');
var uibootstrap = require('angular-ui-bootstrap');

var loginController = require('./controllers/LoginController');
var signUpController = require('./controllers/SignUpController');

var MODULE_NAME = 'app';

var config = require('./app.config');

var app = angular.module(MODULE_NAME, [uirouter, uibootstrap])
                 .controller('LoginController', loginController)
                 .controller('SignUpController', signUpController)
                 .config(config);

module.exports = app;

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
var API_URL = process.env.API_URL;

var config = require('./config');

var app = angular.module(MODULE_NAME, [uirouter, uibootstrap, localstorage, jwt])
    .controller('LoginController', loginController)
    .controller('SignUpController', signUpController)
    .service('Auth', auth)
    .value('API_URL', API_URL)
    .config(config).run(function(Auth, $state, authManager, jwtHelper) {
        var token = Auth.getToken();
        if (token === null || jwtHelper.isTokenExpired(token)) {
            $state.go('login');
        }
        authManager.checkAuthOnRefresh();
        authManager.redirectWhenUnauthenticated();
    });

module.exports = app;

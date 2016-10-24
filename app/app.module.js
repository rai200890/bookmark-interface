var angular = require('angular'),
    uirouter = require('angular-ui-router'),
    uibootstrap = require('angular-ui-bootstrap'),
    localstorage = require('angular-local-storage'),
    jwt = require('angular-jwt'),
    uiRouterExtras = require('ui-router-extras'),
    permission = require('angular-permission/dist/angular-permission'),
    uiPermission = require('angular-permission/dist/angular-permission-ui'),
    angularBootstrapConfirm = require('angular-bootstrap-confirm'),
    uiNavbar = require('ui-navbar'),
    angularGravatar = require('angular-gravatar');

var navigationController = require('./controllers/navigation.controller'),
    loginController = require('./controllers/login.controller'),
    logoutController = require('./controllers/logout.controller'),
    signUpController = require('./controllers/signup.controller'),
    bookmarkListController = require('./controllers/bookmark.list.controller'),
    userEditController = require('./controllers/user.edit.controller'),
    userListController = require('./controllers/user.list.controller');

var bmAlerts = require("./directives/bmAlerts");

var auth = require('./services/auth'),
    bookmark = require('./services/bookmark'),
    user = require('./services/user');


var MODULE_NAME = 'app',
    API_URL = process.env.API_URL,
    WHITELISTED_DOMAINS = process.env.WHITELISTED_DOMAINS.split(",");

var config = require('./app.config');
var run = require('./app.run');

var app = angular.module(MODULE_NAME, [uirouter, ('ct.ui.router.extras.core'),
    permission, uiPermission, uibootstrap, localstorage, jwt,
    angularBootstrapConfirm, 'ui.navbar', 'ui.gravatar'
  ])
  .controller('NavigationController', navigationController)
  .controller('LoginController', loginController)
  .controller('LogoutController', logoutController)
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

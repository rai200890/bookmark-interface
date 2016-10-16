function config($stateProvider, $locationProvider, $urlRouterProvider, localStorageServiceProvider,
  $httpProvider, jwtOptionsProvider, WHITELISTED_DOMAINS) {

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: true
  });

  $stateProvider
    .state('login', {
      url: '/login',
      template: require('./views/login.html'),
      controller: 'LoginController',
      controllerAs: 'ctrl',
      data: {
        requiresLogin: false
      }
    })
    .state('signup', {
      url: '/signup',
      template: require('./views/signup.html'),
      controller: 'SignUpController',
      controllerAs: 'ctrl',
      data: {
        requiresLogin: false
      }
    })
    .state('unauthorized', {
      url: '/unauthorized',
      template: require('./views/403.html'),
      data: {
        requiresLogin: false
      }
    }).state('not_found', {
      url: '/not_found',
      template: require('./views/404.html'),
      data: {
        requiresLogin: false
      }
    })
    .state('protected', {
      abstract: true,
      template: require('./views/home.html'),
      data: {
        requiresLogin: true,
        permissions: {
          only: ['admin', 'client']
        }
      }
    }).state('protected.bookmarks', {
      url: "/bookmarks",
      controller: "BookmarkListController",
      controllerAs: "ctrl",
      template: require('./views/bookmarks/list.html'),
      data: {
        requiresLogin: true,
        permissions: {
          only: ['admin', 'client']
        }
      }
    }).state('protected.users', {
      url: "/users",
      controller: "UserListController",
      controllerAs: "ctrl",
      template: require('./views/users/list.html'),
      data: {
        requiresLogin: true,
        permissions: {
          only: ['admin']
        }
      }
    });

  $urlRouterProvider.otherwise(function($injector) {
    var $state = $injector.get("$state");
    $state.go('not_found');
  });

  localStorageServiceProvider
    .setPrefix('bookmarkApp')
    .setStorageType('sessionStorage');

  jwtOptionsProvider.config({
    whiteListedDomains: WHITELISTED_DOMAINS,
    tokenGetter: ['Auth', function(Auth) {
      return Auth.getToken();
    }],
    unauthenticatedRedirectPath: '/login',
  });

  $httpProvider.interceptors.push('jwtInterceptor');
}
config.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider',
  'localStorageServiceProvider', '$httpProvider', 'jwtOptionsProvider',
  'WHITELISTED_DOMAINS'
];

module.exports = config;

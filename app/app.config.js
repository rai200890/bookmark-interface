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
    }).state('protected', {
      abstract: true,
      template: require('./views/home.html'),
      data: {
        requiresLogin: true
      }
    }).state('protected.bookmarks', {
      url: "/bookmarks",
      controller: "BookmarkListController",
      controllerAs: "ctrl",
      template: require('./views/bookmarks/list.html'),
      data: {
        requiresLogin: true
      }
    });

  $urlRouterProvider.otherwise('/bookmarks');

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

module.exports = ['$stateProvider', '$locationProvider', '$urlRouterProvider', function($stateProvider, $locationProvider, $urlRouterProvider) {

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: true
  });

  $stateProvider
  .state('login', {
    url: '/login',
    template: require('./views/login.html'),
    controller: 'LoginController',
    controllerAs: 'ctrl'
  })
  .state('signup', {
    url: '/signup',
    template: require('./views/signup.html'),
    controller: 'SignUpController',
    controllerAs: 'ctrl'
  });
;

  $urlRouterProvider.when('/', '/login');
}
]

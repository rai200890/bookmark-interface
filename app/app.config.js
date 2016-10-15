function config($stateProvider, $locationProvider, $urlRouterProvider, localStorageServiceProvider, $httpProvider, jwtOptionsProvider) {

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: true
    });

    //ui-router routes
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
        }).state('protected', {
            abstract: true,
            template: require('./views/home.html'),
        }).state('protected.bookmarks', {
            url: "/bookmarks",
            controller: "BookmarkListController",
            controllerAs: "ctrl",
            template: require('./views/bookmarks/list.html')
        });

    $urlRouterProvider.otherwise('/bookmarks');

    //local storage config
    localStorageServiceProvider
        .setPrefix('bookmarkApp')
        .setStorageType('sessionStorage');

    jwtOptionsProvider.config({
        whiteListedDomains: ["localhost"],
        tokenGetter: ['Auth', function(Auth) {
            return Auth.getToken();
        }],
        unauthenticatedRedirectPath: '/login',
    });

$httpProvider.interceptors.push('jwtInterceptor');

};
config.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider', 'localStorageServiceProvider', '$httpProvider', 'jwtOptionsProvider'];

module.exports = config;

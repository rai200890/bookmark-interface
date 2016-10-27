function config($stateProvider, $locationProvider, $urlRouterProvider, localStorageServiceProvider,
    $httpProvider, jwtOptionsProvider, WHITELISTED_DOMAINS) {

    $urlRouterProvider.deferIntercept();

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: true
    });

    $stateProvider
        .state('login', {
            url: '/login',
            template: require('./views/account/login.html'),
            controller: 'LoginController',
            controllerAs: 'ctrl',
            data: {
                requiresLogin: false
            }
        })
        .state('logout', {
            url: '/logout',
            template: '',
            controller: 'LogoutController',
            data: {
                requiresLogin: false
            }
        })
        .state('signup', {
            url: '/signup',
            template: require('./views/account/signup.html'),
            controller: 'SignUpController',
            controllerAs: 'ctrl',
            data: {
                requiresLogin: false
            }
        })
        .state('unauthorized', {
            template: require('./views/403.html'),
            data: {
                requiresLogin: false
            }
        }).state('not_found', {
            template: require('./views/404.html'),
            data: {
                requiresLogin: false
            }
        })
        .state('protected', {
            abstract: true,
            template: require('./views/protected.html'),
            data: {
                requiresLogin: true
            }
        }).state('protected.bookmark_list', {
            url: "/bookmarks",
            controller: "BookmarkListController",
            controllerAs: "ctrl",
            template: require('./views/bookmarks/list.html'),
            data: {
                requiresLogin: true,
                permissions: {
                    only: ['ADMIN', 'CLIENT'],
                    redirectTo: 'unauthorized'
                }
            }
        }).state('protected.user_list', {
            url: "/users",
            controller: "UserListController",
            controllerAs: "ctrl",
            template: require('./views/users/list.html'),
            data: {
                requiresLogin: true,
                permissions: {
                    only: 'ADMIN',
                    redirectTo: 'unauthorized'
                }
            }
        }).state('protected.user_edit', {
            url: "/users/:id",
            controller: "UserEditController",
            controllerAs: "ctrl",
            template: require('./views/users/edit.html'),
            data: {
                requiresLogin: true,
                permissions: {
                    only: 'ADMIN',
                    redirectTo: 'unauthorized'
                }
            }
        }).state('protected.account_info', {
            url: "/account_info",
            controller: "UserEditController",
            controllerAs: "ctrl",
            template: require('./views/account/info.html'),
            data: {
                requiresLogin: true,
                permissions: {
                    only: ['CLIENT', 'ADMIN'],
                    redirectTo: 'unauthorized'
                }
            }
        });

    $urlRouterProvider.when('/', '/bookmarks');

    $urlRouterProvider.otherwise(function($injector) {
        var $state = $injector.get("$state");
        $state.go('not_found');
    });

    localStorageServiceProvider
        .setPrefix('bookmarkApp')
        .setNotify(true, true)
        .setDefaultToCookie(false);
    jwtOptionsProvider.config({
        whiteListedDomains: WHITELISTED_DOMAINS,
        tokenGetter: ['Auth', function(Auth) {
            return Auth.getToken();
        }],
        unauthenticatedRedirectPath: '/login'
    });

    $httpProvider.interceptors.push('jwtInterceptor');
}
config.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider',
    'localStorageServiceProvider', '$httpProvider', 'jwtOptionsProvider',
    'WHITELISTED_DOMAINS'
];

module.exports = config;

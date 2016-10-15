function run(Auth, $rootScope, $state, authManager) {
  $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
    if (!Auth.isTokenValid() && $state.current.name !== 'signup') {
      $state.go('login');
    };

    authManager.checkAuthOnRefresh();
    authManager.redirectWhenUnauthenticated();
  });
};
run.$inject = ['Auth', '$rootScope', '$state', 'authManager', 'jwtHelper'];
module.exports = run;

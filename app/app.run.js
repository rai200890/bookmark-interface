function run(Auth, $state, authManager) {
  if (!Auth.isTokenValid() && $state.current.name !== 'signup') {
    $state.go('login');
  };
  authManager.checkAuthOnRefresh();
  authManager.redirectWhenUnauthenticated();
}
run.$inject = ['Auth', '$state', 'authManager'];
module.exports = run;

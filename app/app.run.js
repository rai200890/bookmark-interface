function run(Auth, $state, authManager, PermRoleStore) {
  if (!Auth.isTokenValid() && $state.current.name !== 'signup') {
    $state.go('login');
  };
  authManager.checkAuthOnRefresh();
  authManager.redirectWhenUnauthenticated();

    PermRoleStore.defineRole('admin', function(){
      return true
    });
    PermRoleStore.defineRole('client', function(){
      return true
    });
};
run.$inject = ['Auth', '$state', 'authManager', 'PermRoleStore'];
module.exports = run;

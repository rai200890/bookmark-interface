function run(Auth, $state, authManager, PermRoleStore, $q) {
  if (!Auth.isTokenValid() && $state.current.name !== 'signup') {
    $state.go('login');
  };
  authManager.checkAuthOnRefresh();
  authManager.redirectWhenUnauthenticated();

  PermRoleStore.defineRole('admin', function() {
    var deferred = $q.defer();
    Auth.getCurrentUser().then(function(user) {
      if ('role_name' in user) {
        deferred.resolve(user.role_name == 'admin');
      } else {
        deferred.reject(false);
      }
    });
    return deferred.promise;
  });

  PermRoleStore.defineRole('client', function() {
    var deferred = $q.defer();
    Auth.getCurrentUser().then(function(user) {
      if ('role_name' in user) {
        deferred.resolve(user.role_name == 'client');
      } else {
        deferred.reject(false);
      }
    });
    return deferred.promise;
  });
};
run.$inject = ['Auth', '$state', 'authManager', 'PermRoleStore', '$q'];
module.exports = run;

function run(Auth, $state, authManager, PermRoleStore, localStorageService, User, $q) {

  if (!Auth.isTokenValid() && $state.current.name !== 'signup') {
    $state.go('login');
  };

  authManager.checkAuthOnRefresh();
  authManager.redirectWhenUnauthenticated();

  PermRoleStore.defineManyRoles({
    'client': function() {
      var deferred = $q.defer();
      Auth.getCurrentUser().then(function(response) {
        deferred.resolve(response.data.user.role_name === 'client');
      }).catch(function() {
        deferred.reject();
      });
      return deferred.promise;
    },
    'admin': function() {
      var deferred = $q.defer();
      Auth.getCurrentUser().then(function(response) {
        deferred.resolve(response.data.user.role_name === 'admin');
      }).catch(function() {
        deferred.reject();
      });
      return deferred.promise;
    }
  });

};
run.$inject = ['Auth', '$state', 'authManager', 'PermRoleStore', 'localStorageService', 'User', '$q'];
module.exports = run;

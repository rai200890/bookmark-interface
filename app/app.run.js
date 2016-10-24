function run(Auth, $state, authManager, PermRoleStore, localStorageService, User, $q) {

    if (!Auth.isTokenValid() && $state.current.name !== 'signup') {
        $state.go('login');
    };

    authManager.checkAuthOnRefresh();
    authManager.redirectWhenUnauthenticated();

    PermRoleStore.defineManyRoles({
        'CLIENT': function() {
            var deferred = $q.defer();
            Auth.getCurrentUser().then(function(response) {
                if (response.data.user.role_name === 'client') {
                    deferred.resolve();
                } else {
                    deferred.reject();
                }
              }).catch(function() {
                deferred.reject();
            });
            return deferred.promise;
        },
        'ADMIN': function() {
            var deferred = $q.defer();
            Auth.getCurrentUser().then(function(response) {
                if (response.data.user.role_name === 'admin') {
                    deferred.resolve();
                } else {
                    deferred.reject();
                }
            }).catch(function() {
                deferred.reject();
            });
            return deferred.promise;
        }
    });

};
run.$inject = ['Auth', '$state', 'authManager', 'PermRoleStore', 'localStorageService', 'User', '$q'];
module.exports = run;

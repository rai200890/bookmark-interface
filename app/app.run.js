function run(Auth, $state, authManager, PermRoleStore, localStorageService, User, $q, $templateCache, $urlRouter) {
    //Add templates to template cache
    var req = require.context('./', true, /\.html$/);
    req.keys().forEach(function(key) {
        var content = req(key);
        $templateCache.put(key, content);
    });

    if (!Auth.isTokenValid() && $state.current.name !== 'signup') {
        $state.go('login');
    }

    authManager.checkAuthOnRefresh();
    authManager.redirectWhenUnauthenticated();

    var currentUser = Auth.getCurrentUser();

    currentUser.then(function() {
        $urlRouter.sync();
        $urlRouter.listen();
    });

    var hasRole = function(currentUser, roleName) {
        var deferred = $q.defer();
        currentUser.then(function(response) {
            if (response.data.user.role_name === roleName) {
                deferred.resolve();
            } else {
                deferred.reject();
            }
        }).catch(function() {
            deferred.reject();
        });
        return deferred.promise;
    };

    PermRoleStore.defineManyRoles({
        'CLIENT': function() {
          return hasRole(currentUser, 'client');
        },
        'ADMIN': function() {
          return hasRole(currentUser, 'admin');
        }
    });

}
run.$inject = ['Auth', '$state', 'authManager', 'PermRoleStore', 'localStorageService', 'User', '$q', '$templateCache', '$urlRouter'];

module.exports = run;

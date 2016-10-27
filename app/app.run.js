function run(Auth, $state, authManager, PermRoleStore, localStorageService, User, $q, $templateCache, $urlRouter, $rootScope) {
    //Add templates to template cache
    var req = require.context('./', true, /\.html$/);
    req.keys().forEach(function(key) {
        var content = req(key);
        $templateCache.put(key, content);
    });

    authManager.checkAuthOnRefresh();
    authManager.redirectWhenUnauthenticated();

    var currentUser = Auth.getCurrentUser();

    currentUser.finally(function() {
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
        }).catch(function(response, statusCode) {
            deferred.reject();
        });
        return deferred.promise;
    };

    $rootScope.$on('LocalStorageModule.notification.setitem', function(event, value){
      if (value.key === 'access_token'){
        currentUser = Auth.getCurrentUser();        
      }
    });

    PermRoleStore.defineManyRoles({
        'CLIENT': function(role_name, transitionProperties) {
            return hasRole(currentUser, 'client');
        },
        'ADMIN': function(role_name, transitionProperties) {
          return hasRole(currentUser, 'admin');
        }
    });

}
run.$inject = ['Auth', '$state', 'authManager', 'PermRoleStore', 'localStorageService', 'User', '$q', '$templateCache', '$urlRouter', '$rootScope'];

module.exports = run;

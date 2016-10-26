function Auth($http, API_URL, localStorageService, jwtHelper, PermRoleStore, User, $q) {
    var self = this;
    var deferred = $q.defer();
    var currentUser = null;
    var cachedUser = null;

    self.login = function(credentials, saveCredentials) {
        var url = API_URL + "/auth";
        var deferred = $q.defer();
        $http({
                "url": url,
                "method": "post",
                "skipAuthorization": true,
                "data": credentials
            })
            .then(function(response) {
                var token = response.data.access_token,
                    decodedToken = jwtHelper.decodeToken(token),
                    userId = decodedToken['identity'];
                localStorageService.set('access_token', token);
                localStorageService.set('user_id', userId);
                deferred.resolve(response);
            }).catch(function(response) {
                deferred.reject(response);
            });
        return deferred.promise;
    };

    self.logout = function() {
        localStorageService.remove('access_token');
        localStorageService.remove('user_id');
    };

    self.getCurrentUser = function() {
        var userId = self.getUserId();
        var deferred = $q.defer();
        if (userId === null) {
            deferred.reject();
            return deferred.promise;
        } else {
            return User.show(userId);
        }
    };

    self.getToken = function() {
        return localStorageService.get('access_token', null);
    };

    self.getUserId = function() {
        return localStorageService.get('user_id', null);
    };

    self.isTokenValid = function() {
        var token = this.getToken();
        return token !== null && !jwtHelper.isTokenExpired(token);
    };
}
Auth.$inject = ['$http', 'API_URL', 'localStorageService', 'jwtHelper', 'PermRoleStore', 'User', '$q'];

module.exports = Auth

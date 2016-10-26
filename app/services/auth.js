function Auth($http, API_URL, localStorageService, jwtHelper, PermRoleStore, User, $q) {
    var self = this;
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
                var token = response.data.access_token;
                if (token) {
                    localStorageService.set('access_token', token);
                    deferred.resolve(response);
                } else {
                    localStorageService.remove('access_token');
                    deferred.reject({
                        'errors': ['Token not found']
                    });
                }
            }).catch(function(response) {
                deferred.reject(response);
            });
        return deferred.promise;
    };

    self.logout = function() {
        localStorageService.remove('access_token');
    };

    self.getCurrentUser = function() {
        var deferred = $q.defer(),
            userId = self.getUserId();
        if (userId) {
            User.show(userId).then(function(response) {
                deferred.resolve(response);
            }).catch(function(response) {
                deferred.reject(response);
            });
        } else {
            deferred.reject();
        }
        return deferred.promise;
    };

    self.getToken = function() {
        return localStorageService.get('access_token', null);
    };

    self.getUserId = function() {
        var token = self.getToken(),
            decodedToken = (token) ? jwtHelper.decodeToken(token): {};
        return decodedToken['identity'];
    };

    self.isTokenValid = function() {
        var token = this.getToken();
        return token !== null && !jwtHelper.isTokenExpired(token);
    };
}
Auth.$inject = ['$http', 'API_URL', 'localStorageService', 'jwtHelper', 'PermRoleStore', 'User', '$q'];

module.exports = Auth

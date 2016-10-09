function Auth($http, API_URL, localStorageService, jwtHelper) {
    this.login = function(credentials, saveCredentials) {
        var url = API_URL + "/auth";
        return $http({
                "url": url,
                "method": "post",
                "skipAuthorization": true,
                "data": credentials
            })
            .success(function(data) {
                var token = data.access_token,
                    decodedToken = jwtHelper.decodeToken(token),
                    userId = decodedToken['identity'];

                localStorageService.set('access_token', token);
                localStorageService.set('user_id', userId);
            });
    };

    this.getUserInfo = function() {
        return $http.get(API_URL + "/users/" + localStorageService.get('user_id'));
    };

    this.getToken = function() {
        return localStorageService.get('access_token', null);
    };
};
Auth.$inject = ['$http', 'API_URL', 'localStorageService', 'jwtHelper'];

module.exports = Auth

function Auth($http, API_URL, localStorageService, jwtHelper, PermRoleStore, User) {
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

  this.getToken = function() {
    return localStorageService.get('access_token', null);
  };

  this.isTokenValid = function() {
    var token = this.getToken();
    return token !== null && !jwtHelper.isTokenExpired(token);
  };
}
Auth.$inject = ['$http', 'API_URL', 'localStorageService', 'jwtHelper', 'PermRoleStore', 'User'];

module.exports = Auth

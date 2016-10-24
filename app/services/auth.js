function Auth($http, API_URL, localStorageService, jwtHelper, PermRoleStore, User, $q) {
  var self = this;
  var deferred = $q.defer();
  var promise = null;
  var cachedUser = null;

  self.login = function(credentials, saveCredentials) {
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

  self.logout = function(){
    localStorageService.remove('access_token');
    localStorageService.remove('user_id');
  };

  self.getCurrentUser = function() {
      return User.show(localStorageService.get('user_id'));
  }

  self.getToken = function() {
    return localStorageService.get('access_token', null);
  };

  self.isTokenValid = function() {
    var token = this.getToken();
    return token !== null && !jwtHelper.isTokenExpired(token);
  };
}
Auth.$inject = ['$http', 'API_URL', 'localStorageService', 'jwtHelper', 'PermRoleStore', 'User', '$q'];

module.exports = Auth

module.exports = ['$http', 'APP_URL', 'localStorageService', function Auth($http, APP_URL, localStorageService){
  this.login = function(credentials, saveCredentials){
    var url = APP_URL + "/auth";

    return $http.post(url, credentials).success(function(data){
      localStorageService.set('access_token', data.access_token);
    });
  };
}]

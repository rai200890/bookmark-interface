function Role($http, API_URL) {

  this.index = function() {
    return $http.get(API_URL + "/roles");
  };

}
Role.$inject = ['$http', 'API_URL'];

module.exports = Role;

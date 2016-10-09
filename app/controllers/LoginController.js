module.exports = ['Auth', '$state', function LoginController(Auth, $state) {
  var ctrl = this;
  ctrl.credentials = {};
  ctrl.errors = [];

  ctrl.login = function() {
    Auth.login(ctrl.credentials).success(function(response) {
      $state.go('protected.bookmarks');
    }).error(function(response, statusCode){
      ctrl.errors = response.errors;
    });
  };
  
}]

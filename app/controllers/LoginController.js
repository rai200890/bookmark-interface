module.exports = ['Auth', function LoginController(Auth) {
  var ctrl = this;

  ctrl.credentials = {};
  ctrl.saveCredentials = true;

  ctrl.login = function(){
    Auth.login(ctrl.credentials).success(function(response){
      console.log(response);

    }).error(function(response){
      console.log('deu ruim');
    });
  };

}]

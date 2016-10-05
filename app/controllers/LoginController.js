module.exports = [function LoginController() {
  var ctrl = this;

  ctrl.credentials = {};
  ctrl.saveCredentials = true;

  ctrl.clear = function(){
    ctrl.credentials = {};
  };

  ctrl.login = function(){
    console.log(ctrl.credentials);

    console.log(ctrl.saveCredentials);

  };

}]

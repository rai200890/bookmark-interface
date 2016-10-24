function UserEditController(User, $stateParams) {
  var ctrl = this;
  ctrl.user = null;
  ctrl.passwordToBeChanged = false;
  ctrl.alerts = [];

  ctrl.save = function() {
    User.update(ctrl.user.id, ctrl.user)
      .success(function() {
        ctrl.alerts.push({
          "type": "success",
          "messages": ["User " + ctrl.user.id + " successfully updated!"]
        });
        ctrl.passwordToBeChanged = false;
      }).error(function(response) {
        ctrl.alerts.push({
          "type": "danger",
          "messages": response.errors
        });
      });
  };

  ctrl.changePassword = function(){
    ctrl.passwordToBeChanged = true;
  };

  User.show($stateParams.id).success(function(response) {
    ctrl.user = response.user;
  });
}

UserEditController.$inject = ['User', '$stateParams'];

module.exports = UserEditController;

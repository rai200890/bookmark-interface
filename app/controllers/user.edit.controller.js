function UserEditController(User, $stateParams) {
  var ctrl = this;
  ctrl.user = null;
  ctrl.alerts = [];

  ctrl.edit = function(user) {
    User.update(user.id, user)
      .success(function() {
        ctrl.alerts.push({
          "type": "success",
          "messages": ["User " + user.id + " successfully updated!"]
        });
      }).error(function(response) {
        ctrl.alerts.push({
          "type": "danger",
          "messages": response.errors
        });
      });
  };

  User.show($stateParams.id).success(function(response) {
    ctrl.user = response.user;
  });
}

UserEditController.$inject = ['User', '$stateParams'];

module.exports = UserEditController;

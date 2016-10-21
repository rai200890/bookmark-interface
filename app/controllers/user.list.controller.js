function UserListController(User) {
  var ctrl = this;
  ctrl.users = [];
  ctrl.alerts = [];

  ctrl.delete = function(user) {
    User.delete(user.id).success(function() {
        ctrl.alerts.push({
          "type": "success",
          "messages": ["User " + user.id + " successfully deleted!"]
        });
      }).error(function(response) {
        ctrl.alerts.push({
          "type": "danger",
          "messages": response.errors
        });
      });
  };

  User.index().success(function(response) {
    ctrl.users = response.users;
  });
}

UserListController.$inject = ['User'];

module.exports = UserListController;

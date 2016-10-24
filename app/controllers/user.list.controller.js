function UserListController(User) {
    var ctrl = this;
    ctrl.users = [];
    ctrl.alerts = [];

    ctrl.delete = function(index) {
        var user = ctrl.users[index];
        User.delete(user.id).success(function() {
            ctrl.alerts.push({
                "type": "success",
                "messages": ["User " + user.id + " successfully deleted!"]
            });
            ctrl.users.splice(index, 1);
        }).error(function(response) {
            ctrl.alerts.push({
                "type": "danger",
                "messages": response.errors
            });
        });
    };

    ctrl.init = function() {
        User.index().success(function(response) {
            ctrl.users = response.users;
        });
    };

    ctrl.init();
}

UserListController.$inject = ['User'];

module.exports = UserListController;

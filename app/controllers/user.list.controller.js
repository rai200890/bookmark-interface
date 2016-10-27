function UserListController(User) {
    var ctrl = this;
    ctrl.users = [];
    ctrl.alerts = [];

    ctrl.delete = function(user) {
        User.delete(user.id).success(function() {
            ctrl.alerts = [{
                "type": "success",
                "messages": ["User " + user.id + " successfully deleted!"]
            }];
            ctrl.reloadUsers();
        }).error(function(response) {
            ctrl.alerts = [{
                "type": "danger",
                "messages": response.errors
            }];
        });
    };

    ctrl.reloadUsers = function() {
        User.index().success(function(response) {
            ctrl.users = response.users;
        });
    };

    ctrl.init = function() {
        ctrl.reloadUsers();
    };

    ctrl.init();
}

UserListController.$inject = ['User'];

module.exports = UserListController;

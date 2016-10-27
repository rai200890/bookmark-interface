function UserEditController(User, Role, Auth, $stateParams) {
    var ctrl = this;
    ctrl.user = null;
    ctrl.roles = {
        availableOptions: [],
        selectedOption: null
    };
    ctrl.passwordToBeChanged = false;
    ctrl.alerts = [];

    ctrl.save = function() {
        ctrl.user.role_id = ctrl.roles.selectedOption['id'];
        ctrl.user.role_name = ctrl.roles.selectedOption['name'];
        User.update(ctrl.user.id, ctrl.user)
            .success(function() {
                ctrl.alerts.push({
                    "type": "success",
                    "messages": ["User info successfully updated!"]
                });
                ctrl.passwordToBeChanged = false;
            }).error(function(response) {
                ctrl.alerts.push({
                    "type": "danger",
                    "messages": response.errors
                });
            });
    };

    ctrl.changePassword = function() {
        ctrl.passwordToBeChanged = true;
    };

    ctrl.init = function() {
        var userId = $stateParams.id || Auth.getUserId();
        User.show(userId).success(function(response) {
            ctrl.user = response.user;
            ctrl.roles.selectedOption = {
                "id": response.user.role_id,
                "name": response.user.role_name
            };
        });
        Role.index().success(function(response) {
            ctrl.roles.availableOptions = response.roles;
        });
    };

    ctrl.init();
}

UserEditController.$inject = ['User', 'Role', 'Auth', '$stateParams'];

module.exports = UserEditController;

function UserEditController(User, Auth, $stateParams) {
    var ctrl = this;
    ctrl.user = null;
    ctrl.passwordToBeChanged = false;
    ctrl.alerts = [];

    ctrl.save = function() {
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
        });
    };

    ctrl.init();
}

UserEditController.$inject = ['User', 'Auth', '$stateParams'];

module.exports = UserEditController;

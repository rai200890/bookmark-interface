function SignUpController(User, $timeout, $state) {
    var ctrl = this;

    ctrl.newUser = {};
    ctrl.passwordConfirmation = null;
    ctrl.alerts = [];

    ctrl.createUser = function() {
        User.create(ctrl.newUser)
            .success(function(response) {
                ctrl.alerts.push({
                    "type": "success",
                    "messages": ["User successfully created! Redirecting to login..."]
                });
                $timeout(function() {
                    $state.go("login");
                }, 3000);
            })
            .error(function(response) {
                ctrl.alerts.push({
                    "type": "danger",
                    "messages": response.errors
                });
            });
    };

    ctrl.clear = function() {
        ctrl.newUser = {};
    };
}
SignUpController.$inject = ['User', '$timeout', '$state'];

module.exports = SignUpController;

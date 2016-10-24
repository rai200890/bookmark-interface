function LoginController(Auth, $state) {
    var ctrl = this;

    ctrl.credentials = {};
    ctrl.alerts = [];

    ctrl.login = function() {
        Auth.login(ctrl.credentials).success(function(response) {
            $state.go('protected.bookmark_list');
        }).error(function(response, statusCode) {
            ctrl.alerts.push({
              type: "danger",
              messages: response.errors
            });
        });
    };
    ctrl.closeErrors = function() {
        ctrl.errors = [];
    };
}
LoginController.$inject = ['Auth', '$state'];

module.exports = LoginController

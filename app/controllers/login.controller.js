function LoginController(Auth, $state) {
    var ctrl = this;
    ctrl.credentials = {};
    ctrl.alerts = [];

    ctrl.login = function() {
        Auth.login(ctrl.credentials).then(function(response) {
            $state.go('protected.bookmark_list');

        }).catch(function(response, statusCode) {
            ctrl.alerts.push({
              type: "danger",
              messages: response.data.errors
            });
        });
    };
}
LoginController.$inject = ['Auth', '$state'];

module.exports = LoginController

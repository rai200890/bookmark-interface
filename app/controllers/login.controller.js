function LoginController(Auth, $state) {
    var ctrl = this;

    ctrl.credentials = {};
    ctrl.errors = [];

    ctrl.login = function() {
        Auth.login(ctrl.credentials).success(function(response) {
            $state.go('protected.bookmarks');
        }).error(function(response, statusCode) {
            ctrl.errors = response.errors
        });

    };
    ctrl.closeErrors = function() {
        ctrl.errors = [];
    };
}
LoginController.$inject = ['Auth', '$state'];

module.exports = LoginController

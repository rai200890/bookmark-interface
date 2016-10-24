function LogoutController(Auth, $state) {
    var ctrl = this;

    ctrl.init = function() {
        Auth.logout();
        $state.go('login');
    }

    ctrl.init();
}

LogoutController.$inject = ['Auth', '$state'];

module.exports = LogoutController

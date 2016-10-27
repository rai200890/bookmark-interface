function LoginController(Auth, $state, localStorageService) {
    var ctrl = this;
    ctrl.credentials = {};
    ctrl.alerts = [];
    ctrl.loading = false;

    ctrl.login = function() {
        ctrl.loading = true;
        Auth.login(ctrl.credentials).then(function(response) {
            $state.go('protected.bookmark_list');
        }).catch(function(response, statusCode) {
            ctrl.alerts = [{
                type: "danger",
                messages: response.data.errors
            }];
        }).finally(function() {
            ctrl.loading = false;
        });
    };
}
LoginController.$inject = ['Auth', '$state', 'localStorageService'];

module.exports = LoginController

function LoginController(Auth, $state, $scope, localStorageService) {
    var ctrl = this;
    var unbind = localStorageService.bind($scope, 'access_token');

    ctrl.credentials = {};
    ctrl.alerts = [];

    ctrl.login = function() {
        Auth.login(ctrl.credentials).then(function(response) {
            $scope.$on('LocalStorageModule.notification.setitem', function(event, value) {
                $state.go('protected.bookmark_list');
            });
        }).catch(function(response, statusCode) {
            ctrl.alerts.push({
                type: "danger",
                messages: response.data.errors
            });
        });
    };
}
LoginController.$inject = ['Auth', '$state', '$scope', 'localStorageService'];

module.exports = LoginController

function run(Auth, $state, authManager, jwtHelper) {
    var token = Auth.getToken();
    if (token === null || jwtHelper.isTokenExpired(token)) {
        $state.go('login');
    };
    authManager.checkAuthOnRefresh();
    authManager.redirectWhenUnauthenticated();
};
run.$inject = ['Auth', '$state', 'authManager', 'jwtHelper'];
module.exports = run;

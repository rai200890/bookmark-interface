describe("LogoutController", function() {
    var controller = null,
        Auth = null,
        state = null,
        httpBackend = null;
    beforeEach(angular.mock.module('app'));
    describe("#init", function() {
        beforeEach(angular.mock.inject(function($controller, _Auth_, $state, $httpBackend) {
            httpBackend = $httpBackend;
            Auth = _Auth_;
            state = $state;
            controller = $controller('LogoutController', {
                'Auth': Auth,
                '$state': state
            });
            spyOn(Auth, "logout").and.callThrough();
            spyOn(state, "go").and.callThrough();
        }));
        it("should call logout and redirect to login state", function() {
            controller.init();
            expect(Auth.logout).toHaveBeenCalled();
            expect(state.go).toHaveBeenCalledWith('login');
        });
    });
});

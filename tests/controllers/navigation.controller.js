describe("NavigationController", function() {
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
            controller = $controller('NavigationController', {
                'Auth': Auth
            });
            spyOn(Auth, "getCurrentUser").and.callThrough();
        }));
        it("should get current user details", function() {
            controller.init();
            expect(Auth.getCurrentUser).toHaveBeenCalled();
        });
    });
});

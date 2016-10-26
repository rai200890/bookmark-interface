describe("NavigationController", function() {
    var controller = null,
        Auth = null,
        state = null,
        $q = null,
        httpBackend = null;
    beforeEach(angular.mock.module('app'));
    describe("#init", function() {
        beforeEach(angular.mock.inject(function($controller, _Auth_, $state, _$q_, $httpBackend) {
            httpBackend = $httpBackend;
            Auth = _Auth_;
            state = $state;
            $q = _$q_;
            controller = $controller('NavigationController', {
                'Auth': Auth
            });
            spyOn(Auth, "getCurrentUser").and.callFake(function() {
                var deferred = $q.defer();
                deferred.resolve({
                    "id": 1,
                    "name": "client",
                    "role_name": "client"
                });
                return deferred.promise;
            });
        }));
        it("should get current user details", function() {
            controller.init();
            expect(Auth.getCurrentUser).toHaveBeenCalled();
        });
    });
});

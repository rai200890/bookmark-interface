describe("UserListController", function() {
    var controller = null,
        User = null,
        httpBackend = null;
    beforeEach(angular.mock.module('app'));
    beforeEach(angular.mock.inject(function($controller, _User_, $httpBackend) {
        httpBackend = $httpBackend;
        User = _User_;
        controller = $controller('UserListController', {
            'User': User
        });
    }));
    beforeEach(function() {
        httpBackend.when('GET', 'http://localhost:5000/users').respond(200, require('raw!../fixtures/users.json'));
        httpBackend.flush();
    });
    afterEach(function() {
        httpBackend.verifyNoOutstandingRequest();
        httpBackend.resetExpectations();
    });
    describe("#reloadUsers", function() {
        beforeEach(function() {
            httpBackend.when("DELETE", 'http://localhost:5000/users/5').respond(204, null);
            spyOn(User, 'index').and.callThrough();
        });
        it("should call user's service index method", function() {
            controller.reloadUsers();
            expect(User.index).toHaveBeenCalled();
        });
    });
    describe("#delete", function() {
        describe("with success", function() {
            beforeEach(function() {
                httpBackend.when("DELETE", 'http://localhost:5000/users/5').respond(204, null);
                spyOn(controller, "reloadUsers");
            });
            it("should display success message and remove user from list", function() {
                controller.delete({
                    "id": 5
                });
                httpBackend.flush();
                expect(controller.alerts).toEqual([{
                    "type": "success",
                    "messages": ["User 5 successfully deleted!"]
                }]);
                expect(controller.reloadUsers).toHaveBeenCalled();
            });
        });
        describe("with error", function() {
            beforeEach(function() {
                httpBackend.when("DELETE", 'http://localhost:5000/users/5').respond(422, {
                    "errors": ["User could not be deleted!"]
                });

            });
            it("should display error message", function() {
                controller.delete({
                    "id": 5
                });
                httpBackend.flush();
                expect(controller.alerts).toEqual([{
                    "type": "danger",
                    "messages": ["User could not be deleted!"]
                }]);
            });
        });
    });
});

describe("User", function() {
    var service = null,
        httpBackend = null;
    beforeEach(angular.mock.module('app'));
    beforeEach(angular.mock.inject(function(User, $httpBackend) {
        httpBackend = $httpBackend;
        service = User;
    }));
    afterEach(function() {
        httpBackend.verifyNoOutstandingRequest();
        httpBackend.verifyNoOutstandingExpectation();
    });
    describe("#create", function() {
        it("should issue post request to api", function() {
            var user = {
                "username": "user",
                "email": "user@mail.com",
                "password": "pass"
            };
            service.create(user);
            httpBackend.expectPOST('http://localhost:5000/users', {
                "user": user
            }).respond(200, {
                "user": {
                    "id": 1,
                    "username": "user",
                    "email": "user@mail.com"
                }
            });
            httpBackend.flush();
        });
    });
    describe("#update", function() {
        it("should issue put request to api", function() {
            var user = {
                "id": 1,
                "username": "user",
                "email": "user@email.com"
            };
            service.update(user.id, user);
            httpBackend.expectPUT('http://localhost:5000/users/1', {
                "user": user
            }).respond(204);
            httpBackend.flush();
        });
    });
    describe("#delete", function() {
        it("should issue delete request to api", function() {
            var id = 1;
            service.delete(id);
            httpBackend.expectDELETE('http://localhost:5000/users/1').respond(204, null);
            httpBackend.flush();
        });
    });
    describe("#index", function() {
        it("should issue get request to api", function() {
            service.index(1, 10);
            httpBackend.expectGET("http://localhost:5000/users").respond(200, require('raw!../fixtures/users.json'));
            httpBackend.flush();
        });
    });
    describe("#show", function() {
        it("should issue get request with id to api", function() {
            service.show(1);
            httpBackend.expectGET("http://localhost:5000/users/1").respond(200, {
                "user": {
                    "id": 1,
                    "username": "user",
                    "email": "user@mail.com",
                    "role_id": 2
                }
            });
            httpBackend.flush();
        });
    });
});

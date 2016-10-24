describe("UserEditController", function() {
  var controller = null,
    User = null,
    httpBackend = null;
  beforeEach(angular.mock.module('app'));
  beforeEach(angular.mock.inject(function($controller, _User_, $httpBackend) {
    httpBackend = $httpBackend;
    User = _User_;
    controller = $controller('UserEditController', {
      'User': User,
      '$stateParams': {'id': 1}
    });
  }));
  beforeEach(function() {
    httpBackend.when('GET', 'http://localhost:5000/users/1').respond(200, {
      "user": {
        "id": 1,
        "username": "user",
        "email": "user@email.com"
      }
    });
    httpBackend.flush();
  });
  afterEach(function() {
    httpBackend.verifyNoOutstandingRequest();
    httpBackend.resetExpectations();
  });
  describe("#save", function() {
    beforeEach(function() {
      controller.alerts = [];
    });
    describe("with valid params", function() {
      beforeEach(function() {
        httpBackend.when("PUT", 'http://localhost:5000/users/1').respond(204, null);
      });
      it("should display success message", function() {
        var user = {
          "id": 1,
          "username": "user",
          "email": "user@mail.com"
        };
        controller.save(user);
        httpBackend.flush();
        expect(controller.alerts).toEqual([{
          "type": "success",
          "messages": ["User 1 successfully updated!"]
        }]);
      });
    });
    describe("with invalid params", function() {
      beforeEach(function() {
        httpBackend.when("PUT", 'http://localhost:5000/users/1').respond(422, {
          "errors": ["Duplicated email"]
        });
      });
      it("should display error messages", function() {
        var user = {
          "id": 1,
          "username": "user",
          "email": "user@mail.com"
        };
        controller.save(user);
        httpBackend.flush();
        expect(controller.alerts).toEqual([{
          "type": "danger",
          "messages": ["Duplicated email"]
        }]);
      });
    });
  });
});

describe("SignUpController", function() {
  var controller = null,
    User = null,
    state = null,
    timeout = null;
  httpBackend = null;
  beforeEach(angular.mock.module('app'));
  describe("#createUser", function() {
    beforeEach(angular.mock.inject(function($controller, User, $timeout, $state, $httpBackend) {
      httpBackend = $httpBackend;
      state = $state;
      timeout = $timeout;
      controller = $controller('SignUpController', {
        'User': User,
        '$timeout': $timeout,
        '$state': state
      });
    }));
    describe("with valid params", function() {
      beforeEach(function() {
        httpBackend.when('POST', 'http://localhost:5000/users').respond(200, {
          "user": {
            "id": 1,
            "username": "user",
            "email": "user@email.com",
            "password": "pass"
          }
        });
        spyOn(state, "go");
      });
      it("should display success message and redirect to login", function() {
        controller.newUser = {
          "username": "user",
          "email": "user@email.com",
          "password": "pass"
        };
        controller.createUser();
        httpBackend.flush();
        timeout.flush();
        expect(state.go).toHaveBeenCalledWith('login');
      });
    });
    describe("with invalid params", function() {
      beforeEach(function() {
        httpBackend.when('POST', 'http://localhost:5000/users').respond(422, {
          "errors": ['Duplicated email field']
        });
      });
      it("should display error messages", function() {
        controller.newUser = {
          "username": "user",
          "email": "user@email.com",
          "password": "pass"
        };
        controller.createUser();
        httpBackend.flush();
        expect(controller.alerts[0].messages).toEqual(['Duplicated email field']);
      });
    });
  });
});

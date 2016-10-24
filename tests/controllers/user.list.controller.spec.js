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
  describe("#delete", function() {
    beforeEach(function() {
      httpBackend.when("DELETE", 'http://localhost:5000/users/5').respond(204, null);
    });
    it("should display success message and remove user from list", function() {
      controller.delete(0);
      httpBackend.flush();
      expect(controller.alerts).toEqual([{
        "type": "success",
        "messages": ["User 5 successfully deleted!"]
      }]);
      expect(controller.users).toEqual([]);
    });
  });
});

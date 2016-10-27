describe("Role", function() {
  var service = null,
    httpBackend = null;
  beforeEach(angular.mock.module('app'));
  beforeEach(angular.mock.inject(function(Role, $httpBackend) {
    httpBackend = $httpBackend;
    service = Role;
  }));
  afterEach(function() {
    httpBackend.verifyNoOutstandingRequest();
    httpBackend.verifyNoOutstandingExpectation();
  });
  describe("#index", function() {
    it("should issue get request to api", function() {
      service.index();
      httpBackend.expectGET("http://localhost:5000/roles").respond(200, require('raw!../fixtures/roles.json'));
      httpBackend.flush();
    });
  });
});

describe("Bookmark", function() {
  var service = null,
    httpBackend = null;
  beforeEach(angular.mock.module('app'));
  beforeEach(angular.mock.inject(function(Bookmark, $httpBackend) {
    httpBackend = $httpBackend;
    service = Bookmark;
  }));
  afterEach(function() {
    httpBackend.verifyNoOutstandingRequest();
    httpBackend.verifyNoOutstandingExpectation();
  });
  describe("#create", function() {
    it("should issue post request to api", function() {
      var bookmark = {
        "title": "Facebook",
        "url": "http://facebook.com"
      };
      service.create(bookmark);
      httpBackend.expectPOST('http://localhost:5000/bookmarks', {
        "bookmark": bookmark
      }).respond(200, {
        "bookmark": {
          "id": 1,
          "title": "Facebook",
          "url": "http://facebook.com"
        }
      });
      httpBackend.flush();
    });
  });
  describe("#update", function() {
    it("should issue put request to api", function() {
      var bookmark = {
        "id": 1,
        "title": "Facebook",
        "url": "http://facebook.com"
      };
      service.update(bookmark.id, bookmark);
      httpBackend.expectPUT('http://localhost:5000/bookmarks/1', {
        "bookmark": bookmark
      }).respond(204);
      httpBackend.flush();
    });
  });
  describe("#delete", function() {
    it("should issue delete request to api", function() {
      var id = 1;
      service.delete(id);
      httpBackend.expectDELETE('http://localhost:5000/bookmarks/1').respond(204, null);
      httpBackend.flush();
    });
  });
  describe("#index", function() {
    it("should issue get request to api", function() {
      service.index(1, 10);
      httpBackend.expectGET("http://localhost:5000/bookmarks?page=1&per_page=10").respond(200, require('raw!../fixtures/bookmarks.json'));
      httpBackend.flush();
    });
  });
});

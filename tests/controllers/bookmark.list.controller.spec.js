describe("BookmarkListController", function() {
  var controller = null,
    Bookmark = null,
    httpBackend = null;
  beforeEach(angular.mock.module('app'));
  beforeEach(angular.mock.inject(function($controller, _Bookmark_, $httpBackend) {
    httpBackend = $httpBackend;
    Bookmark = _Bookmark_;
    controller = $controller('BookmarkListController', {
      'Bookmark': Bookmark,
    });
  }));
  beforeEach(function() {
    httpBackend.when('GET', 'http://localhost:5000/bookmarks?page=1&per_page=10').respond(200, {
      "pagination": {
        "per_page": 10,
        "page": 1
      },
      "bookmarks": []
    });
    httpBackend.flush();
  });
  afterEach(function() {
    httpBackend.verifyNoOutstandingRequest();
    httpBackend.resetExpectations();
  });
  describe("#create", function() {
    describe("with valid params", function() {
      beforeEach(function() {
        httpBackend.when("POST", 'http://localhost:5000/bookmarks').respond(200, {
          "bookmark": {
            "id": 31,
            "title": "Google",
            "url": "http://google.com.br"
          }
        });
        httpBackend.when("GET", 'http://localhost:5000/bookmarks?page=1&per_page=10').respond(200, require("raw!../fixtures/bookmarks.json"));
        spyOn(controller, 'loadBookmarks').and.callThrough();
      });
      it("should reload bookmarks and display success message", function() {
        controller.newBookmark = {
          "title": "Google",
          "url": "http://google.com.br"
        };
        controller.create();
        httpBackend.flush();
        expect(controller.alerts).toEqual([{
          "type": "success",
          "messages": ["Bookmark successfully created!"]
        }]);
        expect(controller.loadBookmarks).toHaveBeenCalled();
      });
    });
    describe("with invalid params", function() {
      beforeEach(function() {
        httpBackend.when("POST", 'http://localhost:5000/bookmarks').respond(422, {
          "errors": ["Duplicate key"]
        });
      });
      it("should display error messages", function() {
        controller.newBookmark = {
          "title": "Google",
          "url": "http://google.com"
        };
        controller.create();
        httpBackend.flush();
        expect(controller.alerts).toEqual([{
          "type": "danger",
          "messages": ["Duplicate key"]
        }]);
      });
    });
  });
  describe("#edit", function() {
    it("set editing attribute to true", function() {
      var bookmark = {
        "id": 1,
        "title": "Facebook",
        "url": "http://www.facebook.com"
      };
      controller.edit(bookmark);
      expect(bookmark.editing).toEqual(true);
    });
  });
  describe("#save", function() {
    beforeEach(function() {
      controller.alerts = [];
    });
    describe("with valid params", function() {
      beforeEach(function() {
        httpBackend.when("PUT", 'http://localhost:5000/bookmarks/1').respond(204, null);
      });
      it("should display success message", function() {
        var bookmark = {
          "id": 1,
          "title": "Facebook",
          "url": "http://www.facebook.com"
        };
        controller.save(bookmark);
        httpBackend.flush();
        expect(controller.alerts).toEqual([{
          "type": "success",
          "messages": ["Bookmark 1 successfully updated!"]
        }]);
      });
    });
    describe("with invalid params", function() {
      beforeEach(function() {
        httpBackend.when("PUT", 'http://localhost:5000/bookmarks/1').respond(422, {
          "errors": ["Duplicated key"]
        });
      });
      it("should display error messages", function() {
        var bookmark = {
          "id": 1,
          "title": "Facebook",
          "url": "http://www.facebook.com"
        };
        controller.save(bookmark);
        httpBackend.flush();
        expect(controller.alerts).toEqual([{
          "type": "danger",
          "messages": ["Duplicated key"]
        }]);
      });
    });
  });
  describe("#delete", function() {
    beforeEach(function() {
      httpBackend.when("DELETE", 'http://localhost:5000/bookmarks/1').respond(204, null);
      spyOn(controller, 'loadBookmarks').and.callThrough();
    });
    it("should display success message and reload bookmarks", function() {
      var bookmark = {
        "id": 1,
        "title": "Facebook",
        "url": "http://www.facebook.com"
      };
      controller.delete(bookmark);
      httpBackend.flush();
      expect(controller.alerts).toEqual([{
        "type": "success",
        "messages": ["Bookmark 1 successfully deleted!"]
      }]);
      expect(controller.loadBookmarks).toHaveBeenCalled();
    });
  });
  describe("#loadBookmarks", function() {
    beforeEach(function() {
      httpBackend.when('GET', 'http://localhost:5000/bookmarks?page=1&per_page=5').respond(200, {
        "pagination": {
          "per_page": 5,
          "page": 1
        },
        "bookmarks": []
      });
      spyOn(Bookmark, "index").and.callThrough();
    });
    it("should reload bookmarks", function() {
      controller.pagination = {
        per_page: 5,
        page: 1
      };
      controller.loadBookmarks();
      httpBackend.flush();
      expect(Bookmark.index).toHaveBeenCalledWith(1, 5);
    });
  });
});

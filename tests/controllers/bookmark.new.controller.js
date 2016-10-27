describe("BookmarkNewController", function() {
    var controller = null,
        Bookmark = null,
        httpBackend = null;
    beforeEach(angular.mock.module('app'));
    beforeEach(angular.mock.inject(function($controller, _Bookmark_, $httpBackend) {
        httpBackend = $httpBackend;
        Bookmark = _Bookmark_;
        controller = $controller('BookmarkNewController', {
            'Bookmark': Bookmark
        });
    }));
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
});

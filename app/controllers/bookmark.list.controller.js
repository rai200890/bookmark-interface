function BookmarkListController(Bookmark) {
  var ctrl = this;
  ctrl.bookmarks = [];
  ctrl.pagination = {
    per_page: 10,
    page: 1
  };

  ctrl.newBookmark = {};
  ctrl.alerts = [];

  ctrl.create = function() {
    Bookmark.create(ctrl.newBookmark)
      .success(function(response) {
        ctrl.alerts.push({
          "type": "success",
          "messages": ["Bookmark successfully created!"]
        });
        ctrl.loadBookmarks();
      })
      .error(function(response) {
        ctrl.alerts.push({
          "type": "danger",
          "messages": response.errors
        });
      });
  };

  ctrl.edit = function(bookmark) {
    bookmark.editing = true;
  };

  ctrl.save = function(bookmark) {
    Bookmark.update(bookmark.id, bookmark)
      .success(function() {
        ctrl.alerts.push({
          "type": "success",
          "messages": ["Bookmark " + bookmark.id + " successfully updated!"]
        });
        bookmark.editing = false;
      })
      .error(function(response) {
        ctrl.alerts.push({
          "type": "danger",
          "messages": response.errors
        });
      });
  };

  ctrl.delete = function(bookmark) {
    Bookmark.delete(bookmark.id)
      .success(function() {
        ctrl.alerts.push({
          "type": "success",
          "messages": ["Bookmark " + bookmark.id + " successfully deleted!"]
        });
        ctrl.loadBookmarks();
      })
      .error(function(response) {
        ctrl.alerts.push({
          "type": "danger",
          "messages": response.errors
        });
      });
  };

  ctrl.loadBookmarks = function() {
    Bookmark.index(ctrl.pagination.page, ctrl.pagination.per_page)
      .success(function(response) {
        ctrl.bookmarks = response.bookmarks;
        ctrl.pagination = response.pagination;
      });
  };

  ctrl.loadBookmarks();
}

BookmarkListController.$inject = ['Bookmark'];

module.exports = BookmarkListController;

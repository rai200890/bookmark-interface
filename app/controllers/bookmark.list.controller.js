function BookmarkListController(Bookmark) {
    var ctrl = this;
    ctrl.bookmarks = [];

    //init
    Bookmark.index(1, 15).success(function(response){
      ctrl.bookmarks = response;
    });
};
BookmarkListController.$inject = ['Bookmark'];

module.exports = BookmarkListController;

function BookmarkNewController(Bookmark) {
    var ctrl = this;

    ctrl.newBookmark = {};
    ctrl.alerts = [];

    ctrl.create = function() {
        Bookmark.create(ctrl.newBookmark)
            .success(function(response) {
                ctrl.alerts = [{
                    "type": "success",
                    "messages": ["Bookmark successfully created!"]
                }];
            })
            .error(function(response) {
                ctrl.alerts = [{
                    "type": "danger",
                    "messages": response.errors
                }];
            });
    };

    ctrl.clear = function() {
        ctrl.newBookmark = {};
    };
}

BookmarkNewController.$inject = ['Bookmark'];

module.exports = BookmarkNewController;

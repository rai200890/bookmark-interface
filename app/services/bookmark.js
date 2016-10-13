function Bookmark($http, API_URL) {
    this.index = function(page, per_page) {
        return $http.get(API_URL + "/bookmarks");
    };
    this.create = function(bookmark) {
        return $http.post(API_URL + "/bookmarks", {
            "bookmark": bookmark
        });
    };
    this.edit = function(id, bookmark) {
        return $http.put(API_URL + "/bookmarks/" + id, {
            "bookmark": bookmark
        });
    };
    this.delete = function(id) {
        return $http.delete(API_URL + "/bookmarks/" + id);
    };
}
Bookmark.$inject = ['$http', 'API_URL'];

module.exports = Bookmark;

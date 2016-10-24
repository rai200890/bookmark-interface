function NavigationController($scope, Auth, $state) {
    $scope.currentUser = null;
    $scope.bookmarks_menu = [{
        name: "Bookmark List",
        link: ".bookmark_list"
    }];

    $scope.users_menu = [{
        name: "Users List",
        link: ".user_list"
    }];

    $scope.logout = function(){
      Auth.logout();
      $state.go('login');
    };

    Auth.getCurrentUser().success(function(response) {
        $scope.currentUser = response.user;
    });
}

NavigationController.$inject = ['$scope', 'Auth', '$state'];

module.exports = NavigationController;

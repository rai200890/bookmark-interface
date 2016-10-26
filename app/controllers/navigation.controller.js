function NavigationController(Auth, $state) {
    var ctrl = this;

    ctrl.currentUser = null;

    ctrl.bookmarks_menu = [{
        name: "Bookmark List",
        link: ".bookmark_list"
    }];

    ctrl.users_menu = [{
        name: "Users List",
        link: ".user_list"
    }];

    ctrl.account_menu = [{
      name: "Account Info",
      link: ".account_info"
    },{
            name: "divider",
            link: "#"

    },{
        name: "Logout",
        link: "logout"
    }];

    ctrl.init = function(){
      Auth.getCurrentUser().then(function(response) {
          ctrl.currentUser = response.data.user;
      });
    };

    ctrl.init();
}

NavigationController.$inject = ['Auth', '$state'];

module.exports = NavigationController;
